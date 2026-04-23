import React, { useEffect ,useState} from 'react'
import { useAdminUsers } from '../hooks/useApi'
import { userService } from '../services/adminUsersService';
const UsersColumn = () => {
  const [refreshKey, setRefreshKey] = useState(0)
  const [query,setQuery]=useState('')
  const { users, loading, error } = useAdminUsers(query, refreshKey)
    const refetch = () => setRefreshKey(k => k + 1)
const [editingId,setEditingId]=useState('')
const [editValues,setEditValues]=useState({});
    console.log(users)

     const handleSave = async (id) => {
  try {
    console.log(editValues.role)
    console.log(editValues.isActive)

    if (id) {
      const data = {
        role: editValues.role,
        isActive: editValues.isActive,
      };
      await userService.update(id, data);
      refetch();
    }
  } catch (err) {
    console.log(err.message);
  }

  setEditingId(null);
};

  return (
      <div className="overflow-x-auto bg-cream-light p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-ink">Users</h2>
        <button
          onClick={()=>refetch()}
          className="px-4 py-2 bg-lux text-white rounded-lg hover:bg-lux/90 transition-colors font-medium text-sm"
        >
          Refresh
        </button>
      </div>

      <table className="w-full border-collapse border border-hair">
        <thead className="bg-lux text-white">
          <tr>
            <th className="border border-hair px-4 py-2 text-left text-sm font-semibold">ID</th>
            <th className="border border-hair px-4 py-2 text-left text-sm font-semibold">Name</th>
            <th className="border border-hair px-4 py-2 text-left text-sm font-semibold">Email</th>
            <th className="border border-hair px-4 py-2 text-left text-sm font-semibold">Role</th>
            <th className="border border-hair px-4 py-2 text-left text-sm font-semibold">Status</th>
            <th className="border border-hair px-4 py-2 text-left text-sm font-semibold">Joined</th>
            <th className="border border-hair px-4 py-2 text-left text-sm font-semibold">Actions</th>
          </tr>
        </thead>

        {users && users.length > 0 ? (
          <tbody>
            {users.map((user) => {
              const isEditing = editingId === user._id;
              return (
                <tr key={user._id} className="hover:bg-cream border-b border-hair">

                  {/* ID */}
                  <td className="border border-hair px-4 py-3 text-xs text-hair font-mono">
                    {user._id.slice(-8)}
                  </td>

                  {/* Name */}
                  <td className="border border-hair px-4 py-3 text-sm font-semibold text-ink">
                    {user.firstName} {user.lastName}
                  </td>

                  {/* Email */}
                  <td className="border border-hair px-4 py-3 text-sm text-ink">
                    {user.email}
                  </td>

                  {/* Role — dropdown when editing */}
                  <td className="border border-hair px-4 py-3 text-sm">
                    {isEditing ? (
                      <select
                        value={editValues.role}
                        onChange={(e) =>
                          setEditValues((prev) => ({ ...prev, role: e.target.value }))
                        }
                        className="border border-hair rounded px-2 py-1 text-sm text-ink bg-white"
                      >
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                      </select>
                    ) : (
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-blue-100 text-blue-800"
                      }`}>
                        {user.role}
                      </span>
                    )}
                  </td>

                  {/* Status — toggle when editing */}
                  <td className="border border-hair px-4 py-3 text-sm">
                    {isEditing ? (
                      <button
                        onClick={() =>
                          setEditValues((prev) => ({ ...prev, isActive: !prev.isActive }))
                        }
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          editValues.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {editValues.isActive ? "✓ Active" : "✗ Banned"}
                      </button>
                    ) : (
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        user.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}>
                        {user.isActive ? " Active" : " Banned"}
                      </span>
                    )}
                  </td>

                  {/* Joined */}
                  <td className="border border-hair px-4 py-3 text-xs text-hair">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}
                  </td>

                  {/* Actions */}
                  <td className="border border-hair px-4 py-3 text-sm">
                    <div className="flex gap-2">
                     {user?.role !== 'admin' ? (
  isEditing ? (
    <>
      <button
        onClick={() => handleSave(user._id)}
        className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-xs"
      >
        Save
      </button>
      <button
        onClick={() => setEditingId(null)}
        className="px-3 py-1 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors font-medium text-xs"
      >
        Cancel
      </button>
    </>
  ) : (
    <button
      onClick={() => {
        setEditingId(user._id);
        setEditValues({ role: user.role, isActive: user.isActive });
      }}
      className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium text-xs"
    >
      Edit
    </button>
  )
): <p>No actions</p>}
                    </div>
                  </td>

                </tr>
              );
            })}
          </tbody>
          // <div>hello</div>
        ) : (
          <tbody>
            <tr>
              <td colSpan="7" className="border border-hair px-4 py-6 text-center text-hair">
                {loading ? "Loading users..." : "No users found."}
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default UsersColumn