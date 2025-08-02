import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface SearchAndFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  roleFilter: string;
  onRoleChange: (value: string) => void;
  onAddUser: () => void;
  roles: string[];
}

const UserSearchFilter: React.FC<SearchAndFilterProps> = ({
  search,
  onSearchChange,
  roleFilter,
  onRoleChange,
  onAddUser,
  roles,
}) => {
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const normalized = e.target.value.trim(); // Keep spacing control, remove front spaces
    onSearchChange(normalized);
  };

  return (
    <div className="flex flex-col gap-4 mb-4 lg:flex-row lg:items-center">
      {/* Search Input - Full width always, takes remaining space on desktop */}
      <Input
        placeholder="Search by name or email"
        value={search}
        onChange={handleSearchInput}
        className="w-full lg:flex-1"
      />

      {/* Role + Add User Buttons - 50/50 on small screens, inline on large */}
      <div className="flex gap-2 w-full lg:w-auto">
        <Select value={roleFilter} onValueChange={onRoleChange}>
          <SelectTrigger className="w-1/2 min-w-[100px]">
            <SelectValue placeholder="Filter by Role" />
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

        <Button className="w-1/2 lg:w-auto" onClick={onAddUser}>
          Add User
        </Button>
      </div>
    </div>
  );
};

export default UserSearchFilter;
