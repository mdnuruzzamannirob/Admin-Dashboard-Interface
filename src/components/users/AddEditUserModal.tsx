import type { FC } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
import type { User, UserForm } from "@/types";

interface Props {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  editingUser: User | null;
  form: UserForm;
  setForm: (form: UserForm) => void;
  formErrors: Partial<UserForm>;
  handleSaveUser: () => void;
  ROLES: string[];
}

const AddEditUserModal: FC<Props> = ({
  modalOpen,
  setModalOpen,
  editingUser,
  form,
  setForm,
  formErrors,
  handleSaveUser,
  ROLES,
}) => {
  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editingUser ? "Edit User" : "Add User"}</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSaveUser();
          }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={formErrors.name ? "border-red-500" : ""}
            />
            {formErrors.name && (
              <div className="text-xs text-red-500">{formErrors.name}</div>
            )}
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={formErrors.email ? "border-red-500" : ""}
            />
            {formErrors.email && (
              <div className="text-xs text-red-500">{formErrors.email}</div>
            )}
          </div>
          <div className="space-y-2">
            <Label>Role</Label>
            <Select
              value={form.role}
              onValueChange={(value) => setForm({ ...form, role: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {ROLES.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formErrors.role && (
              <div className="text-xs text-red-500">{formErrors.role}</div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Label>Status</Label>
            <Switch
              checked={form.active}
              onCheckedChange={(value) => setForm({ ...form, active: value })}
            />
            <span>{form.active ? "Active" : "Inactive"}</span>
          </div>
          <DialogFooter className="flex gap-2">
            <Button type="submit">{editingUser ? "Save" : "Add"}</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditUserModal;
