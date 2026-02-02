import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { getAllProperties, getPropertyById, getPropertyImages, addPropertyImage, updatePropertyId, updateImageOrder, deletePropertyImage } from "./db";
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
  }),
});

export type AppRouter = typeof appRouter;
