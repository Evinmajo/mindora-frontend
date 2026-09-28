import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin Dashboard — Mindora" }],
  }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [filter, setFilter] = useState("All");

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [targetStatus, setTargetStatus] = useState("");
  const [customNote, setCustomNote] = useState("");
  const [meetLink, setMeetLink] = useState("");

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/bookings`);
      if (!res.ok) throw new Error("Server error fetching bookings");
      const json = await res.json();
      if (json.success) {
        setBookings(json.data);
      } else {
        alert(json.error || "Failed to fetch bookings.");
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);
      alert("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const filteredBookings = useMemo(() => {
    if (filter === "All") return bookings;
    return bookings.filter((b) => b.status === filter);
  }, [bookings, filter]);

  const closeModal = () => {
    setModalOpen(false);
    setSelectedBooking(null);
    setTargetStatus("");
    setCustomNote("");
    setMeetLink("");
  };

  const openActionModal = (booking, status) => {
    setSelectedBooking(booking);
    setTargetStatus(status);
    setMeetLink(booking.meetLink || "");
    setCustomNote(
      status === "Confirmed"
        ? "We are looking forward to our session! Please use the Google Meet link below at your scheduled time."
        : "Unfortunately, this slot is unavailable. Please select another convenient slot on our website."
    );
    setModalOpen(true);
  };

  const handleConfirmStatusChange = async () => {
    if (!selectedBooking) return;

    const bookingId = selectedBooking._id;
    setUpdatingId(bookingId);

    try {
      const res = await fetch(`${API_BASE}/api/admin/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: targetStatus,
          customNote,
          meetLink: targetStatus === "Confirmed" ? meetLink : "",
        }),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        setBookings((prev) =>
          prev.map((b) => (b._id === bookingId ? json.booking : b))
        );
        closeModal();
      } else {
        alert(`Failed to update booking: ${json.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Error connecting to server.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      const res = await fetch(`${API_BASE}/api/admin/bookings/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setBookings((prev) => prev.filter((b) => b._id !== id));
      } else {
        alert("Failed to delete booking.");
      }
    } catch (err) {
      console.error("Error deleting record:", err);
      alert("Error connecting to server.");
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-6 pt-12 pb-20">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium tracking-[0.22em] text-sagedeep uppercase">
            Management Panel
          </p>
          <h1 className="font-display text-3xl font-medium tracking-tight">
            Consultation Bookings
          </h1>
        </div>
        <button
          onClick={fetchBookings}
          disabled={loading}
          className="rounded-full bg-white/60 px-5 py-2.5 text-xs font-medium ring-1 ring-black/5 hover:bg-white transition-colors disabled:opacity-50"
        >
          {loading ? "Refreshing..." : "Refresh Data"}
        </button>
      </div>

      {/* FILTER TABS */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {["All", "Pending Payment", "Pending", "Confirmed", "Cancelled"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
              filter === tab
                ? "bg-black/80 text-white"
                : "bg-white/50 text-foreground/70 hover:bg-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="py-20 text-center text-sm text-foreground/50">
          Loading booking entries...
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="rounded-3xl bg-white/45 p-12 text-center ring-1 ring-black/5 backdrop-blur-xl">
          <p className="text-sm text-foreground/60">
            No {filter !== "All" ? filter.toLowerCase() : ""} bookings found in the database.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-3xl bg-white/45 p-6 ring-1 ring-black/5 backdrop-blur-xl">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-black/5 text-xs font-medium text-foreground/50">
              <tr>
                <th className="pb-3">Client Name</th>
                <th className="pb-3">Service Details</th>
                <th className="pb-3">Date & Time</th>
                <th className="pb-3">Contact</th>
                <th className="pb-3">Payment Info</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {filteredBookings.map((item) => (
                <tr key={item._id} className="hover:bg-black/5 transition-colors">
                  <td className="py-4 font-medium">
                    {item.name}
                    {item.note && (
                      <span className="block text-xs font-normal text-foreground/50 truncate max-w-xs">
                        "{item.note}"
                      </span>
                    )}
                  </td>
                  <td className="py-4">
                    {item.service}
                    <span className="block text-xs text-foreground/50">
                      {item.minutes} mins · {item.price}
                    </span>
                  </td>
                  <td className="py-4 whitespace-nowrap">
                    {item.date}
                    <span className="block text-xs text-foreground/50">at {item.time}</span>
                  </td>
                  <td className="py-4 text-xs">
                    <div>{item.email}</div>
                    <div className="text-foreground/50">{item.phone || "No phone"}</div>
                  </td>
                  <td className="py-4 text-xs font-mono">
                    {item.paymentId ? (
                      <span className="text-emerald-700">{item.paymentId}</span>
                    ) : (
                      <span className="text-foreground/40">Unpaid</span>
                    )}
                  </td>
                  <td className="py-4">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-[11px] font-medium ${
                        item.status === "Confirmed"
                          ? "bg-emerald-100 text-emerald-800"
                          : item.status === "Cancelled"
                          ? "bg-rose-100 text-rose-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 text-right whitespace-nowrap">
                    <div className="flex justify-end gap-2">
                      <button
                        disabled={updatingId === item._id || item.status === "Confirmed"}
                        onClick={() => openActionModal(item, "Confirmed")}
                        className="rounded-full bg-moss px-3 py-1 text-xs text-cream hover:opacity-90 disabled:opacity-40"
                      >
                        {updatingId === item._id && targetStatus === "Confirmed" ? "..." : "Confirm"}
                      </button>
                      <button
                        disabled={updatingId === item._id || item.status === "Cancelled"}
                        onClick={() => openActionModal(item, "Cancelled")}
                        className="rounded-full border border-border px-3 py-1 text-xs hover:bg-secondary disabled:opacity-40"
                      >
                        {updatingId === item._id && targetStatus === "Cancelled" ? "..." : "Cancel"}
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="rounded-full bg-red-500/10 px-3 py-1 text-xs text-red-600 hover:bg-red-500/20"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* CONFIRM / CANCEL MODAL */}
      {modalOpen && selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl ring-1 ring-black/5">
            <h3 className="font-display text-xl font-medium text-foreground">
              {targetStatus === "Confirmed" ? "Confirm Booking" : "Cancel Booking"}
            </h3>
            <p className="mt-1 text-xs text-foreground/60">
              Updating status will dispatch an automated status email to{" "}
              <span className="font-medium text-foreground">{selectedBooking.email}</span>.
            </p>

            {targetStatus === "Confirmed" && (
              <div className="mt-5">
                <label className="block text-xs font-medium text-foreground/70 mb-1.5">
                  Google Meet Link:
                </label>
                <input
                  type="url"
                  placeholder="https://meet.google.com/..."
                  value={meetLink}
                  onChange={(e) => setMeetLink(e.target.value)}
                  className="w-full rounded-2xl bg-slate-50 p-3.5 text-xs text-foreground ring-1 ring-black/10 focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
            )}

            <div className="mt-4">
              <label className="block text-xs font-medium text-foreground/70 mb-1.5">
                Note for client email (optional):
              </label>
              <textarea
                rows={3}
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                className="w-full rounded-2xl bg-slate-50 p-3.5 text-xs leading-relaxed text-foreground ring-1 ring-black/10 focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
              />
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                disabled={updatingId !== null}
                onClick={closeModal}
                className="rounded-full border border-border px-5 py-2 text-xs font-medium text-foreground hover:bg-secondary disabled:opacity-50"
              >
                Dismiss
              </button>
              <button
                type="button"
                disabled={updatingId !== null}
                onClick={handleConfirmStatusChange}
                className={`rounded-full px-5 py-2 text-xs font-medium text-cream disabled:opacity-50 ${
                  targetStatus === "Confirmed" ? "bg-moss" : "bg-rose-600"
                }`}
              >
                {updatingId ? "Sending..." : `Send Email & ${targetStatus}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
