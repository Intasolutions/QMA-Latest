// frontend/src/admin/AdminDashboard.jsx
export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-green-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <ul>
          <li className="mb-3"><a href="/admin/members">Members</a></li>
          <li className="mb-3"><a href="/admin/events">Events</a></li>
          <li><a href="/admin/announcements">Announcements</a></li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold">Welcome, Admin</h1>
        <p className="mt-2">Manage members, events, and announcements here.</p>
      </main>
    </div>
  );
}
