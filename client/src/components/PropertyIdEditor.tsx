import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface PropertyIdEditorProps {
  currentId: string;
  onIdUpdated?: (newId: string) => void;
}

export default function PropertyIdEditor({ currentId, onIdUpdated }: PropertyIdEditorProps) {
  const [newId, setNewId] = useState(currentId);
  const [isEditing, setIsEditing] = useState(false);
  const updateIdMutation = trpc.properties.updateId.useMutation();

  const handleUpdateId = async () => {
    if (!newId.trim()) {
      toast.error("ID não pode estar vazio");
      return;
    }

    if (newId === currentId) {
      toast.info("O novo ID é igual ao atual");
      setIsEditing(false);
      return;
    }

    try {
      await updateIdMutation.mutateAsync({
        oldId: currentId,
        newId: newId.trim(),
      });
      
      toast.success(`ID atualizado de "${currentId}" para "${newId}"`);
      setIsEditing(false);
      onIdUpdated?.(newId);
    } catch (error) {
      toast.error("Erro ao atualizar ID");
      console.error(error);
    }
  };

  if (!isEditing) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">ID:</span>
        <code className="bg-muted px-2 py-1 rounded text-sm font-mono">{currentId}</code>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsEditing(true)}
        >
          Editar ID
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3 p-4 bg-muted rounded-lg">
      <Label htmlFor="property-id">Novo ID do Imóvel</Label>
      <div className="flex gap-2">
        <Input
          id="property-id"
          value={newId}
          onChange={(e) => setNewId(e.target.value)}
          placeholder="ex: id-q33"
          disabled={updateIdMutation.isPending}
        />
      </div>
      <div className="flex gap-2">
        <Button
          onClick={handleUpdateId}
          disabled={updateIdMutation.isPending}
          size="sm"
        >
          {updateIdMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          Confirmar
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setNewId(currentId);
            setIsEditing(false);
          }}
          disabled={updateIdMutation.isPending}
          size="sm"
        >
          Cancelar
        </Button>
      </div>
    </div>
  );
}
