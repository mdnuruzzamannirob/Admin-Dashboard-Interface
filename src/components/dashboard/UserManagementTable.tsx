import { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  active: boolean;
};

type UserForm = {
  name: string;
  email: string;
  role: string;
  active: boolean;
};

const roles = ["Admin", "Editor", "Viewer"];

const UserManagementTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage] = useState<number>(5);

  // Modal state
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form, setForm] = useState<UserForm>({
    name: "",
    email: "",
    role: "",
    active: true,
  });
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    email?: string;
    role?: string;
  }>({});

  // Fetch users from mock_users.json on mount
  useEffect(() => {
    fetch("/src/data/mock_users.json")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(() => setUsers([]));
  }, []);

  // Filtering
  const filteredUsers = users.filter(
    (u: User) =>
      (u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())) &&
      (roleFilter !== "all" ? u.role === roleFilter : true)
  );

  // Pagination
  const paginatedUsers = filteredUsers.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

  // Toggle user active status
  const handleToggleActive = (id: number) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, active: !u.active } : u)));
  };

  // Open modal for add/edit
  const handleOpenModal = (user: User | null = null) => {
    setEditingUser(user);
    setForm(
      user ? { ...user } : { name: "", email: "", role: "", active: true }
    );
    setFormErrors({});
    setModalOpen(true);
  };

  // Validate form
  const validateForm = (): { name?: string; email?: string; role?: string } => {
    const errors: { name?: string; email?: string; role?: string } = {};
    if (!form.name.trim()) errors.name = "Name required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      errors.email = "Valid email required";
    if (!form.role) errors.role = "Role required";
    return errors;
  };

  // Save user (add/edit)
  const handleSaveUser = () => {
    const errors = validateForm();
    if (Object.keys(errors).length) {
      setFormErrors(errors);
      return;
    }
    if (editingUser) {
      setUsers(
        users.map((u) =>
          u.id === editingUser.id ? { ...form, id: editingUser.id } : u
        )
      );
    } else {
      setUsers([...users, { ...form, id: Date.now() }]);
    }
    setModalOpen(false);
  };

  // Pagination controls
  const handlePrevPage = () => setPage(Math.max(page - 1, 0));
  const handleNextPage = () => setPage(page + 1);

  return (
    <div>
      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
        />
        <Select
          value={roleFilter}
          onValueChange={(value) => {
            setRoleFilter(value);
            setPage(0);
          }}
        >
          <SelectTrigger className="min-w-[120px]">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {roles.map((role) => (
              <SelectItem key={role} value={role}>
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={() => handleOpenModal()}>Add User</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={user.active}
                    onCheckedChange={() => handleToggleActive(user.id)}
                  />
                  <span>{user.active ? "Active" : "Inactive"}</span>
                </div>
              </TableCell>
              <TableCell>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleOpenModal(user)}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 flex justify-between items-center">
        <Button
          variant="outline"
          onClick={handlePrevPage}
          disabled={page === 0}
        >
          Prev
        </Button>
        <span>
          Page {page + 1} of{" "}
          {Math.max(1, Math.ceil(filteredUsers.length / rowsPerPage))}
        </span>
        <Button
          variant="outline"
          onClick={handleNextPage}
          disabled={(page + 1) * rowsPerPage >= filteredUsers.length}
        >
          Next
        </Button>
      </div>
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
            <div>
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
            <div>
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
            <div>
              <Label>Role</Label>
              <Select
                value={form.role}
                onValueChange={(value) => setForm({ ...form, role: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
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
                onCheckedChange={(checked) =>
                  setForm({ ...form, active: checked })
                }
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
    </div>
  );
};

export default UserManagementTable;
