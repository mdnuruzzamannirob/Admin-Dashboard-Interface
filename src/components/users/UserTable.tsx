import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import type { FC } from "react";
import type { User } from "@/types";

interface UserTableProps {
  paginatedUsers: User[];
  handleToggleActive: (id: number) => void;
  handleOpenModal: (user: User) => void;
}

const UserTable: FC<UserTableProps> = ({
  paginatedUsers,
  handleToggleActive,
  handleOpenModal,
}) => {
  return (
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
  );
};

export default UserTable;
