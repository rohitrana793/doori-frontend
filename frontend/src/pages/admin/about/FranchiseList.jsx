import { useCallback, useEffect, useState } from "react";
import { deleteRequest, getRequest } from "../../../api/apiRequest";
import PageHeader from "../../../components/commom/PageHeader";
import DataTable from "../../../components/commom/DataTable";
import DeleteModal from "../../../components/commom/DeleteModal";
import { showToast } from "../../../utils/customToast";

const FranchiseList = () => {
  const [data, setData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const showCreateButton = false;
  const showActionButton = false;

  const columns = [
    {
      header: "SN",
      key: "sn",
    },
    {
      header: "First Name",
      key: "first_name",
    },
    {
      header: "Surname",
      key: "surname",
    },
    {
      header: "Email",
      key: "email",
    },
    {
      header: "Franchise",
      key: "franchise",
    },
    {
      header: "Message",
      key: "message",
    },
  ];

  const getFranchises = async () => {
    try {
      const response = await getRequest("/about/franchise/list/");
      setData(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      showToast({ error });
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const response = await deleteRequest(
        `/about/franchise/list/${deleteId}/`,
      );

      setShowDeleteModal(false);
      setDeleteId("");

      await getFranchises();

      showToast({
        response: response.message,
      });
    } catch (error) {
      showToast({ error });
    }
  };

  const handleSearch = useCallback(async (value) => {
    try {
    } catch (error) {
      showToast({ error });
    }
  }, []);

  useEffect(() => {
    getFranchises();
  }, []);

  return (
    <div>
      <PageHeader
        title="Franchise"
        handleSearch={handleSearch}
        showCreateButton={showCreateButton}
      />

      <DataTable
        columns={columns}
        rows={data}
        setShowDeleteModal={setShowDeleteModal}
        setDeleteId={setDeleteId}
        showActionButton={showActionButton}
      />

      {showDeleteModal && (
        <DeleteModal
          setShowDeleteModal={setShowDeleteModal}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default FranchiseList;
