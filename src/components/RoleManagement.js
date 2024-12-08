// src/components/RoleManagement.js
import React, { useState, useEffect } from "react";
import { fetchDataFromAPI, postDataToAPI } from '../api';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Checkbox, FormControlLabel, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState({});
  const [openRoleDialog, setOpenRoleDialog] = useState(false); // To manage the role dialog open/close
  const [openPermissionDialog, setOpenPermissionDialog] = useState(false); // To manage the permission dialog open/close
  const [roleName, setRoleName] = useState(""); // For the new role name
  const [permissionName, setPermissionName] = useState(""); // For the new permission name
  const [selectedPermissionIds, setSelectedPermissionIds] = useState([]); // Selected permissions for the new role
  const [newPermissions, setNewPermissions] = useState([]); // List of new permissions

  // Fetch roles and permissions when component mounts
  useEffect(() => {
    const fetchRolesAndPermissions = async () => {
      try {
        const rolesResponse = await fetchDataFromAPI('/user/role/');
        setRoles(rolesResponse.results || []);

        const permissionsResponse = await fetchDataFromAPI('/user/permission');
        setPermissions(permissionsResponse.results || []);
      } catch (error) {
        console.error("Error fetching roles and permissions:", error);
      }
    };

    fetchRolesAndPermissions();
  }, []);

  // Handle permission change for a specific role
  const handlePermissionChange = (roleId, permissionId, checked) => {
    const method = checked ? "POST" : "DELETE";
    axios({
      method,
      url: `/user/role/${roleId}/permission/`,
      data: { permission_id: permissionId },
    })
      .then(() => {
        setRoles((prevRoles) =>
          prevRoles.map((role) =>
            role.id === roleId
              ? {
                  ...role,
                  permissions: checked
                    ? [...role.permissions, { id: permissionId }]
                    : role.permissions.filter((perm) => perm.id !== permissionId),
                }
              : role
          )
        );
      })
      .catch((error) => {
        console.error("Error updating permission:", error);
      });
  };

  // Create the columns for DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Nom', width: 200 },
    {
      field: 'permissions',
      headerName: 'Permissions',
      width: 400,
      renderCell: (params) => {
        const rolePermissions = params.row.permissions;
        return (
          <Box>
            {permissions.map((permission) => (
              <FormControlLabel
                key={permission.id}
                control={
                  <Checkbox
                    checked={rolePermissions.some((p) => p.id === permission.id)}
                    onChange={(e) =>
                      handlePermissionChange(
                        params.row.id,
                        permission.id,
                        e.target.checked
                      )
                    }
                  />
                }
                label={permission.name}
              />
            ))}
          </Box>
        );
      },
    },
  ];

  // Prepare rows data for the DataGrid
  const rows = roles.map((role) => ({
    id: role.id,
    name: role.name,
    permissions: role.permissions || [],
  }));

  // Open the dialog for creating a role
  const handleOpenRoleDialog = () => {
    setOpenRoleDialog(true);
  };

  // Close the dialog for creating a role
  const handleCloseRoleDialog = () => {
    setOpenRoleDialog(false);
    setRoleName(""); // Clear role name
    setSelectedPermissionIds([]); // Clear selected permissions
  };

  // Handle the creation of a new role
  const handleCreateRole = async () => {
    try {
      // Create the new role
      const response = await postDataToAPI('/user/role/', { name: roleName });
      const newRole = response.data;

      // Assign selected permissions to the new role
      selectedPermissionIds.forEach(async (permissionId) => {
        await postDataToAPI(`/user/role/${newRole.id}/permissions/`, {
          permission_id: permissionId,
        });
      });

      // Update the state with the new role
      setRoles((prevRoles) => [...prevRoles, { ...newRole, permissions: [] }]);
      handleCloseRoleDialog(); // Close the role dialog
    } catch (error) {
      console.error("Error creating role:", error);
    }
  };

  // Open the dialog for creating a permission
  const handleOpenPermissionDialog = () => {
    setOpenPermissionDialog(true);
  };

  // Close the dialog for creating a permission
  const handleClosePermissionDialog = () => {
    setOpenPermissionDialog(false);
    setPermissionName(""); // Clear permission name
  };

  // Handle the creation of a new permission
  const handleCreatePermission = async () => {
    try {
      // Create the new permission
      const response = await axios.post('/user/permission/', { name: permissionName });
      const newPermission = response.data;

      // Add the new permission to the permissions list
      setPermissions((prevPermissions) => [...prevPermissions, newPermission]);
      handleClosePermissionDialog(); // Close the permission dialog
    } catch (error) {
      console.error("Error creating permission:", error);
    }
  };

  return (
    <div>
      <h1>Gestion des Rôles</h1>
      <Button variant="contained" color="primary" onClick={handleOpenRoleDialog}>
        Créer un rôle
      </Button>
      <Button variant="contained" color="secondary" onClick={handleOpenPermissionDialog}>
        Créer une permission
      </Button>

      {/* Display the DataGrid */}
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} />
      </div>

      {/* Dialog for creating a new role */}
      <Dialog open={openRoleDialog} onClose={handleCloseRoleDialog}>
        <DialogTitle>Créer un Nouveau Rôle</DialogTitle>
        <DialogContent>
          <TextField
            label="Nom du rôle"
            fullWidth
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            margin="normal"
          />
          <h3>Permissions</h3>
          {permissions.map((permission) => (
            <FormControlLabel
              key={permission.id}
              control={
                <Checkbox
                  checked={selectedPermissionIds.includes(permission.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedPermissionIds([...selectedPermissionIds, permission.id]);
                    } else {
                      setSelectedPermissionIds(
                        selectedPermissionIds.filter((id) => id !== permission.id)
                      );
                    }
                  }}
                />
              }
              label={permission.name}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRoleDialog} color="secondary">
            Annuler
          </Button>
          <Button onClick={handleCreateRole} color="primary">
            Créer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for creating a new permission */}
      <Dialog open={openPermissionDialog} onClose={handleClosePermissionDialog}>
        <DialogTitle>Créer une Nouvelle Permission</DialogTitle>
        <DialogContent>
          <TextField
            label="Nom de la permission"
            fullWidth
            value={permissionName}
            onChange={(e) => setPermissionName(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePermissionDialog} color="secondary">
            Annuler
          </Button>
          <Button onClick={handleCreatePermission} color="primary">
            Créer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RoleManagement;
