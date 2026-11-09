"use client";

import { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";
import { formatDate } from "@/lib/utils";
import { Loader2, Eye, Trash2, Check, X } from "lucide-react";

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  courseInterested: string | null;
  education: string | null;
  learningGoals: string | null;
  message: string | null;
  type: string;
  companyName: string | null;
  contactPerson: string | null;
  businessEmail: string | null;
  participants: string | null;
  trainingFormat: string | null;
  isRead: boolean;
  createdAt: string;
}

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [showModal, setShowModal] = useState(false);

  const fetchEnquiries = async () => {
    try {
      const response = await fetch("/api/enquiries");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setEnquiries(data.enquiries || []);
    } catch (error) {
      console.error("Error fetching enquiries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleView = async (enquiry: Enquiry) => {
    setSelectedEnquiry(enquiry);
    setShowModal(true);

    // Mark as read if not already
    if (!enquiry.isRead) {
      try {
        await fetch(`/api/admin/enquiries/${enquiry.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isRead: true }),
        });
        setEnquiries(enquiries.map(e => 
          e.id === enquiry.id ? { ...e, isRead: true } : e
        ));
      } catch (error) {
        console.error("Error marking as read:", error);
      }
    }
  };

  const handleToggleRead = async (enquiry: Enquiry) => {
    try {
      await fetch(`/api/admin/enquiries/${enquiry.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: !enquiry.isRead }),
      });
      setEnquiries(enquiries.map(e => 
        e.id === enquiry.id ? { ...e, isRead: !e.isRead } : e
      ));
    } catch (error) {
      console.error("Error toggling read status:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;

    try {
      await fetch(`/api/admin/enquiries/${id}`, { method: "DELETE" });
      setEnquiries(enquiries.filter(e => e.id !== id));
      if (selectedEnquiry?.id === id) {
        setShowModal(false);
        setSelectedEnquiry(null);
      }
    } catch (error) {
      console.error("Error deleting enquiry:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-brand-purple" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Enquiries</h1>
        <p className="text-text-secondary">{enquiries.length} total enquiries</p>
      </div>

      <Card padding="none">
        {enquiries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="text-left py-4 px-6 text-text-muted text-sm font-medium">Name</th>
                  <th className="text-left py-4 px-6 text-text-muted text-sm font-medium">Contact</th>
                  <th className="text-left py-4 px-6 text-text-muted text-sm font-medium">Course</th>
                  <th className="text-left py-4 px-6 text-text-muted text-sm font-medium">Type</th>
                  <th className="text-left py-4 px-6 text-text-muted text-sm font-medium">Status</th>
                  <th className="text-left py-4 px-6 text-text-muted text-sm font-medium">Date</th>
                  <th className="text-left py-4 px-6 text-text-muted text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((enquiry) => (
                  <tr key={enquiry.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-4 px-6">
                      <p className="text-white font-medium">{enquiry.name}</p>
                      {enquiry.education && (
                        <p className="text-text-muted text-sm">{enquiry.education}</p>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-text-secondary">{enquiry.email}</p>
                      <p className="text-text-muted text-sm">{enquiry.phone}</p>
                    </td>
                    <td className="py-4 px-6 text-text-secondary">
                      {enquiry.courseInterested || "-"}
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant={enquiry.type === "corporate" ? "secondary" : "default"} size="sm">
                        {enquiry.type}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <Badge 
                        variant={enquiry.isRead ? "success" : "warning"} 
                        size="sm"
                      >
                        {enquiry.isRead ? "Read" : "Unread"}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-text-muted text-sm">
                      {formatDate(new Date(enquiry.createdAt))}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleView(enquiry)}>
                          <Eye size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleToggleRead(enquiry)}
                          title={enquiry.isRead ? "Mark as unread" : "Mark as read"}
                        >
                          {enquiry.isRead ? <X size={16} /> : <Check size={16} />}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDelete(enquiry.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-text-secondary">No enquiries yet.</p>
          </div>
        )}
      </Card>

      {/* Enquiry Detail Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Enquiry Details">
        {selectedEnquiry && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-text-muted text-sm">Name</p>
                <p className="text-white">{selectedEnquiry.name}</p>
              </div>
              <div>
                <p className="text-text-muted text-sm">Email</p>
                <p className="text-white">{selectedEnquiry.email}</p>
              </div>
              <div>
                <p className="text-text-muted text-sm">Phone</p>
                <p className="text-white">{selectedEnquiry.phone}</p>
              </div>
              <div>
                <p className="text-text-muted text-sm">Type</p>
                <Badge variant={selectedEnquiry.type === "corporate" ? "secondary" : "default"}>
                  {selectedEnquiry.type}
                </Badge>
              </div>
            </div>

            {selectedEnquiry.courseInterested && (
              <div>
                <p className="text-text-muted text-sm">Course Interested</p>
                <p className="text-white">{selectedEnquiry.courseInterested}</p>
              </div>
            )}

            {selectedEnquiry.education && (
              <div>
                <p className="text-text-muted text-sm">Education</p>
                <p className="text-white">{selectedEnquiry.education}</p>
              </div>
            )}

            {selectedEnquiry.learningGoals && (
              <div>
                <p className="text-text-muted text-sm">Learning Goals</p>
                <p className="text-white">{selectedEnquiry.learningGoals}</p>
              </div>
            )}

            {selectedEnquiry.message && (
              <div>
                <p className="text-text-muted text-sm">Message</p>
                <p className="text-white">{selectedEnquiry.message}</p>
              </div>
            )}

            {/* Corporate-specific fields */}
            {selectedEnquiry.type === "corporate" && (
              <>
                {selectedEnquiry.companyName && (
                  <div>
                    <p className="text-text-muted text-sm">Company</p>
                    <p className="text-white">{selectedEnquiry.companyName}</p>
                  </div>
                )}
                {selectedEnquiry.participants && (
                  <div>
                    <p className="text-text-muted text-sm">Participants</p>
                    <p className="text-white">{selectedEnquiry.participants}</p>
                  </div>
                )}
                {selectedEnquiry.trainingFormat && (
                  <div>
                    <p className="text-text-muted text-sm">Training Format</p>
                    <p className="text-white">{selectedEnquiry.trainingFormat}</p>
                  </div>
                )}
              </>
            )}

            <div className="pt-4 border-t border-white/10">
              <p className="text-text-muted text-sm">
                Received on {formatDate(new Date(selectedEnquiry.createdAt))}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
