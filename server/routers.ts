import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { getAllProperties, getPropertyById, getPropertyImages, addPropertyImage, updatePropertyId, updateImageOrder, deletePropertyImage, createContactMessage, createBrokerApplication, createProperty, updateProperty, getAllHeroMedia, getActiveHeroMedia, createHeroMedia, updateHeroMedia, deleteHeroMedia } from "./db";
import { notifyOwner } from "./_core/notification";
import { storagePut } from "./storage";
import { z } from "zod";
import { nanoid } from "nanoid";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  properties: router({
    list: publicProcedure.query(async () => {
      const allProperties = await getAllProperties();
      // Buscar imagens para cada imóvel
      const propertiesWithImages = await Promise.all(
        allProperties.map(async (property) => {
          const images = await getPropertyImages(property.id);
          return { ...property, images };
        })
      );
      return propertiesWithImages;
    }),
    getById: publicProcedure.input(z.string()).query(async ({ input }) => {
      const property = await getPropertyById(input);
      if (!property) return null;
      const images = await getPropertyImages(input);
      return { ...property, images };
    }),
    uploadImage: protectedProcedure
      .input(z.object({
        propertyId: z.string(),
        fileData: z.string(), // base64
        fileName: z.string(),
        fileType: z.string(),
      }))
      .mutation(async ({ input }) => {
        // Decodificar base64 para buffer
        const base64Data = input.fileData.split(',')[1]; // Remove "data:image/jpeg;base64,"
        const buffer = Buffer.from(base64Data, 'base64');
        const fileKey = `properties/${input.propertyId}/${nanoid()}-${input.fileName}`;
        const { url } = await storagePut(fileKey, buffer, input.fileType);
        
        await addPropertyImage({
          id: nanoid(),
          propertyId: input.propertyId,
          imageUrl: url,
          order: 0,
        });
        
        return { url };
      }),
    addImageByUrl: protectedProcedure
      .input(z.object({
        propertyId: z.string(),
        imageUrl: z.string().url(),
      }))
      .mutation(async ({ input }) => {
        let finalUrl = input.imageUrl;
        
        // Converter URLs do Imgur para formato direto
        // Ex: https://imgur.com/kSgrGLt -> https://i.imgur.com/kSgrGLt.jpeg
        const imgurMatch = input.imageUrl.match(/^https?:\/\/(www\.)?imgur\.com\/([a-zA-Z0-9]+)$/);
        if (imgurMatch) {
          const imageId = imgurMatch[2];
          finalUrl = `https://i.imgur.com/${imageId}.jpeg`;
        }
        
        // Converter URLs do Imgur com /a/ (album) para imagem direta
        // Ex: https://imgur.com/a/kSgrGLt -> não suportado (album)
        
        // Converter URLs do i.imgur sem extensão
        // Ex: https://i.imgur.com/kSgrGLt -> https://i.imgur.com/kSgrGLt.jpeg
        const iImgurMatch = input.imageUrl.match(/^https?:\/\/i\.imgur\.com\/([a-zA-Z0-9]+)$/);
        if (iImgurMatch) {
          const imageId = iImgurMatch[1];
          finalUrl = `https://i.imgur.com/${imageId}.jpeg`;
        }
        
        await addPropertyImage({
          id: nanoid(),
          propertyId: input.propertyId,
          imageUrl: finalUrl,
          order: 0,
        });
        
        return { url: finalUrl };
      }),
    updateId: protectedProcedure
      .input(z.object({
        oldId: z.string(),
        newId: z.string(),
      }))
      .mutation(async ({ input }) => {
        await updatePropertyId(input.oldId, input.newId);
        return { success: true };
      }),
    updateImageOrder: protectedProcedure
      .input(z.object({
        imageId: z.string(),
        order: z.number(),
      }))
      .mutation(async ({ input }) => {
        await updateImageOrder(input.imageId, input.order);
        return { success: true };
      }),
    deleteImage: protectedProcedure
      .input(z.object({
        imageId: z.string(),
      }))
      .mutation(async ({ input }) => {
        await deletePropertyImage(input.imageId);
        return { success: true };
      }),
    toggleFeatured: protectedProcedure
      .input(z.object({
        propertyId: z.string(),
        featured: z.boolean(),
      }))
      .mutation(async ({ input }) => {
        const { updatePropertyFeatured } = await import("./db");
        await updatePropertyFeatured(input.propertyId, input.featured);
        return { success: true };
      }),
    create: protectedProcedure
      .input(z.object({
        id: z.string(),
        title: z.string().min(1),
        type: z.string().min(1),
        price: z.number().positive(),
        address: z.string().min(1),
        city: z.string().min(1),
        state: z.string().min(1),
        latitude: z.string(),
        longitude: z.string(),
        bedrooms: z.number().optional(),
        bathrooms: z.number().optional(),
        area: z.number().optional(),
        parking: z.number().optional(),
        description: z.string().optional(),
        status: z.enum(["pronto_para_morar", "em_construcao", "vendido"]).optional(),
        deliveryDate: z.string().optional(),
        neighborhood: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await createProperty({
          id: input.id,
          title: input.title,
          type: input.type,
          price: input.price,
          address: input.address,
          city: input.city,
          state: input.state,
          latitude: input.latitude as any,
          longitude: input.longitude as any,
          bedrooms: input.bedrooms || null,
          bathrooms: input.bathrooms || null,
          area: input.area || null,
          parking: input.parking || null,
          description: input.description || null,
          status: input.status || "pronto_para_morar",
          deliveryDate: input.deliveryDate ? new Date(input.deliveryDate) : null,
          featured: false,
          mainImageUrl: null,
          neighborhood: input.neighborhood || null,
        });
        return { success: true, id: input.id };
      }),
    update: protectedProcedure
      .input(z.object({
        id: z.string(),
        title: z.string().min(1),
        type: z.string().min(1),
        price: z.number().positive(),
        address: z.string().min(1),
        city: z.string().min(1),
        state: z.string().min(1),
        latitude: z.string(),
        longitude: z.string(),
        bedrooms: z.number().optional(),
        bathrooms: z.number().optional(),
        area: z.number().optional(),
        parking: z.number().optional(),
        description: z.string().optional(),
        status: z.enum(["pronto_para_morar", "em_construcao", "vendido"]).optional(),
        deliveryDate: z.string().optional(),
        neighborhood: z.string().optional(),
        whatsappMessage: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await updateProperty(input.id, {
          title: input.title,
          type: input.type,
          price: input.price,
          address: input.address,
          city: input.city,
          state: input.state,
          latitude: input.latitude as any,
          longitude: input.longitude as any,
          bedrooms: input.bedrooms || null,
          bathrooms: input.bathrooms || null,
          area: input.area || null,
          parking: input.parking || null,
          description: input.description || null,
          status: input.status || "pronto_para_morar",
          deliveryDate: input.deliveryDate ? new Date(input.deliveryDate) : null,
          neighborhood: input.neighborhood || null,
          whatsappMessage: input.whatsappMessage || null,
        });
        return { success: true };
      }),
    neighborhoods: publicProcedure.query(async () => {
      const allProperties = await getAllProperties();
      const uniqueSet = new Set(
        allProperties
          .map((p) => p.neighborhood)
          .filter((n): n is string => !!n && n.trim() !== '')
      );
      const neighborhoods = Array.from(uniqueSet).sort();
      return neighborhoods;
    }),
  }),

  heroMedia: router({
    list: publicProcedure.query(async () => {
      return await getActiveHeroMedia();
    }),
    listAll: protectedProcedure.query(async () => {
      return await getAllHeroMedia();
    }),
    create: protectedProcedure
      .input(z.object({
        mediaUrl: z.string().min(1),
        mediaType: z.enum(["image", "video"]).default("image"),
        duration: z.number().min(1).max(60).default(5),
        position: z.string().default("center center"),
        order: z.number().default(0),
      }))
      .mutation(async ({ input }) => {
        const id = nanoid();
        await createHeroMedia({
          id,
          mediaUrl: input.mediaUrl,
          mediaType: input.mediaType,
          duration: input.duration,
          position: input.position,
          order: input.order,
        });
        return { success: true, id };
      }),
    update: protectedProcedure
      .input(z.object({
        id: z.string(),
        mediaUrl: z.string().optional(),
        mediaType: z.enum(["image", "video"]).optional(),
        duration: z.number().min(1).max(60).optional(),
        position: z.string().optional(),
        order: z.number().optional(),
        active: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...updates } = input;
        await updateHeroMedia(id, updates);
        return { success: true };
      }),
    delete: protectedProcedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ input }) => {
        await deleteHeroMedia(input.id);
        return { success: true };
      }),
    upload: protectedProcedure
      .input(z.object({
        fileName: z.string(),
        fileData: z.string(), // base64
        contentType: z.string(),
        duration: z.number().min(1).max(60).default(5),
        position: z.string().default("center center"),
        order: z.number().default(0),
      }))
      .mutation(async ({ input }) => {
        const buffer = Buffer.from(input.fileData, "base64");
        const fileKey = `hero/${nanoid()}-${input.fileName}`;
        const { url } = await storagePut(fileKey, buffer, input.contentType);
        
        const id = nanoid();
        await createHeroMedia({
          id,
          mediaUrl: url,
          mediaType: input.contentType.startsWith("video") ? "video" : "image",
          duration: input.duration,
          position: input.position,
          order: input.order,
        });
        return { success: true, id, url };
      }),
  }),

  contact: router({
    sendMessage: publicProcedure
      .input(z.object({
        nome: z.string().min(1),
        email: z.string().email(),
        telefone: z.string().min(1),
        assunto: z.string().min(1),
        mensagem: z.string().min(1),
      }))
      .mutation(async ({ input }) => {
        const id = nanoid();
        await createContactMessage({ id, ...input });
        
        // Notificar proprietário
        await notifyOwner({
          title: `Nova mensagem de contato: ${input.assunto}`,
          content: `Nome: ${input.nome}\nEmail: ${input.email}\nTelefone: ${input.telefone}\n\nMensagem:\n${input.mensagem}`,
        });
        
        return { success: true, id };
      }),
    
    sendBrokerApplication: publicProcedure
      .input(z.object({
        nome: z.string().min(1),
        email: z.string().email(),
        telefone: z.string().min(1),
        creci: z.string().min(1),
        experiencia: z.string().optional(),
        regiao: z.string().optional(),
        mensagem: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const id = nanoid();
        await createBrokerApplication({ id, ...input });
        
        // Notificar proprietário
        await notifyOwner({
          title: `Novo cadastro de Corretor Parceiro: ${input.nome}`,
          content: `Nome: ${input.nome}\nCRECI: ${input.creci}\nEmail: ${input.email}\nTelefone: ${input.telefone}\nExperiência: ${input.experiencia || 'Não informado'}\nRegião: ${input.regiao || 'Não informado'}\n\nMensagem:\n${input.mensagem || 'Nenhuma mensagem adicional'}`,
        });
        
        return { success: true, id };
      }),
  }),
});

export type AppRouter = typeof appRouter;
