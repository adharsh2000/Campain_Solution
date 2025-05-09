import React, { useEffect, useState, useMemo } from "react";
import {NotificationManager} from "react-notifications"
import { MaterialReactTable } from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";
import groupService from "../../services/groupService";

const ContactGroupList = ({ contacts }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    console.log("++++++:", contacts);
    setData(contacts?.contactDetails);
  }, [contacts]);

  async function fetchData(groupId) {
    await groupService.getContactsfromGroups(groupId).then(async(response) => {
      console.log(response)
      await setData(response?.data?.data?.contactDetails)
    })
  }
  const columns = useMemo(() => [
    {
      // accessorFn: (row) => `${row.firstName}`,
      accessorKey:"firstName",
      header: "Contact Name",
    },
    {
      accessorKey: "email",
      header: "Contact Email",
    },
  ]);

  const handleDelete = (id, name ,groupId) => {
    console.log("ID: ",groupId)
    const choice = window.confirm("Do you want to delete '" + name + "' ?");
    if (choice) {
      deleteAction(id,groupId);
    }
  };

  const deleteAction = async (id,groupId) => {
    console.log("Inside deleteAction");
    groupService
      .deleteContactFromGroup(id,groupId)
      .then(async (response) => {
        console.dir(response);
        fetchData(groupId)
       

        NotificationManager.success(response?.data?.message);
      })
      .catch((error) => {
        console.log(error);
        // NotificationManager.error("Error while deleting Group");
        NotificationManager.error(error?.message);
      });
  };

  return (
    <>
      <div>
        <MaterialReactTable
          displayColumnDefOptions={{
            "mrt-row-actions": {
              muiTableHeadCellProps: {
                align: "center",
              },
              size: 120,
            },
          }}
          enableEditing
          columns={columns}
          data={data || []} // Wrap data in an array because MaterialReactTable expects an array
          positionActionsColumn="last"
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: "flex", gap: "1rem" }}>
              {/* <Tooltip arrow placement="left" title="Edit">
                <IconButton
                  onClick={() => userModal(row)}
                  data-bs-toggle="modal"
                  data-bs-target="#exLargeModal"
                >
                  <Edit />
                </IconButton>
              </Tooltip> */}
              <Tooltip arrow placement="right" title="Delete">
                <IconButton
                  color="error"
                  onClick={() =>
                    handleDelete(row?.original?.id, row?.original?.firstName,contacts?.groupId)
                  }
                >
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        />
      </div>
    </>
  );
};

export default ContactGroupList;
