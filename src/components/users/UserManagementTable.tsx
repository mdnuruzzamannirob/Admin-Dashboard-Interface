import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import type { User, UserForm } from "@/types";
import { useSelector, useDispatch } from "react-redux";
import {
  addUser,
  selectUsers,
  setUsers,
  toggleUserActive,
  updateUser,
} from "@/features/users/userSlice";
import AddEditUserModal from "./AddEditUserModal";
import UserTable from "./UserTable";
import UserSearchFilter from "./UserSearchFilter";

const ROLES = ["Admin", "Editor", "Viewer"];
const ROWS_PER_PAGE = 10;

const UserManagementTable = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers)
    ?.slice()
    .sort((a, b) => new Date(b.id).getTime() - new Date(a.id).getTime());

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [page, setPage] = useState(0);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form, setForm] = useState<UserForm>({
    name: "",
    email: "",
    role: "",
    active: true,
  });
  const [formErrors, setFormErrors] = useState<Partial<UserForm>>({});

  useEffect(() => {
    fetch("/src/data/mock_users.json")
      .then((res) => res.json())
      .then((data) => dispatch(setUsers(data)))
      .catch(() => dispatch(setUsers([])));
  }, [dispatch]);

  const filteredUsers = users.filter(
    (user) =>
      (user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())) &&
      (roleFilter === "all" || user.role === roleFilter)
  );

  const paginatedUsers = filteredUsers.slice(
    page * ROWS_PER_PAGE,
    (page + 1) * ROWS_PER_PAGE
  );

  const handleToggleActive = (id: number) => {
    dispatch(toggleUserActive(id));
  };

  const handleOpenModal = (user: User | null = null) => {
    setEditingUser(user);
    setForm(
      user
        ? {
            name: user.name,
            email: user.email,
            role: user.role,
            active: user.active,
          }
        : { name: "", email: "", role: "", active: true }
    );
    setFormErrors({});
    setModalOpen(true);
  };

  const validateForm = (): Partial<UserForm> => {
    const errors: Partial<UserForm> = {};
    if (!form.name.trim()) errors.name = "Name required";
    if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = "Valid email required";
    if (!form.role) errors.role = "Role required";
    return errors;
  };

  const handleSaveUser = () => {
    const errors = validateForm();
    if (Object.keys(errors).length) {
      setFormErrors(errors);
      return;
    }

    if (editingUser) {
      dispatch(updateUser({ ...form, id: editingUser.id }));
    } else {
      dispatch(addUser({ ...form, id: Date.now() }));
    }

    setModalOpen(false);
    setEditingUser(null);
  };

  return (
    <div>
      {/* Filter Section */}
      <UserSearchFilter
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(0);
        }}
        roleFilter={roleFilter}
        onRoleChange={(value) => {
          setRoleFilter(value);
          setPage(0);
        }}
        onAddUser={() => handleOpenModal()}
        roles={ROLES}
      />

      {/* Table */}
      <UserTable
        paginatedUsers={paginatedUsers}
        handleToggleActive={handleToggleActive}
        handleOpenModal={handleOpenModal}
      />

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
        >
          Prev
        </Button>
        <span>
          Page {page + 1} of{" "}
          {Math.max(1, Math.ceil(filteredUsers.length / ROWS_PER_PAGE))}
        </span>
        <Button
          variant="outline"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={(page + 1) * ROWS_PER_PAGE >= filteredUsers.length}
        >
          Next
        </Button>
      </div>

      {/* Modal */}
      <AddEditUserModal
        ROLES={ROLES}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        editingUser={editingUser}
        form={form}
        setForm={setForm}
        formErrors={formErrors}
        handleSaveUser={handleSaveUser}
      />
    </div>
  );
};

export default UserManagementTable;
