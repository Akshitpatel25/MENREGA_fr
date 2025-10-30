import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
  Box,
  Chip,
  Avatar,
  TablePagination,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  FilterList,
  SearchOutlined,
  MoreVert,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';

const OrderList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
    const isDark = useSelector((state) => state.theme.value);
  const ordersData = [
    {
      id: '#CM9801',
      user: 'Natoll Craig',
      avatar: 'N',
      project: 'Landing Page',
      address: 'Meadow Lane Oakland',
      date: 'Just now',
      status: 'In Progress',
      color: '#3B82F6',
    },
    {
      id: '#CM9802',
      user: 'Kate Morrison',
      avatar: 'K',
      project: 'CRM Admin pages',
      address: 'Larry San Francisco',
      date: 'A minute ago',
      status: 'Complete',
      color: '#10B981',
    },
    {
      id: '#CM9803',
      user: 'Drew Cano',
      avatar: 'D',
      project: 'Client Project',
      address: 'Bagwell Avenue Ocala',
      date: '1 hour ago',
      status: 'Pending',
      color: '#F59E0B',
    },
    {
      id: '#CM9804',
      user: 'Orlando Diggs',
      avatar: 'O',
      project: 'Admin Dashboard',
      address: 'Washburn Baton Rouge',
      date: 'Yesterday',
      status: 'Approved',
      color: '#8B5CF6',
    },
    {
      id: '#CM9805',
      user: 'Andi Lane',
      avatar: 'A',
      project: 'App Landing Page',
      address: 'Nest Lane Olivette',
      date: 'Feb 2, 2023',
      status: 'Rejected',
      color: '#EF4444',
    },
    {
      id: '#CM9801',
      user: 'Natoll Craig',
      avatar: 'N',
      project: 'Landing Page',
      address: 'Meadow Lane Oakland',
      date: 'Just now',
      status: 'In Progress',
      color: '#3B82F6',
    },
    {
      id: '#CM9802',
      user: 'Kate Morrison',
      avatar: 'K',
      project: 'CRM Admin pages',
      address: 'Larry San Francisco',
      date: 'A minute ago',
      status: 'Complete',
      color: '#10B981',
    },
    {
      id: '#CM9803',
      user: 'Drew Cano',
      avatar: 'D',
      project: 'Client Project',
      address: 'Bagwell Avenue Ocala',
      date: '1 hour ago',
      status: 'Pending',
      color: '#F59E0B',
    },
  ];

  // Filter and sort logic
  const filteredOrders = useMemo(() => {
    let filtered = ordersData.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.address.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === 'all' || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    // Sort
    if (sortBy === 'id') {
      filtered.sort((a, b) => a.id.localeCompare(b.id));
    } else if (sortBy === 'user') {
      filtered.sort((a, b) => a.user.localeCompare(b.user));
    } else if (sortBy === 'status') {
      filtered.sort((a, b) => a.status.localeCompare(b.status));
    }

    return filtered;
  }, [searchTerm, statusFilter, sortBy]);

  const paginatedOrders = filteredOrders.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const bgColor = isDark ? '#1c1c1c' : '#FFFFFF';
  const textColor = isDark ? '#F3F4F6' : '#1C1C1C';
  const borderColor = isDark ? '#374151' : '#E5E7EB';
  const hoverBg = isDark ? '#1c1c1c' : '#F9FAFB';

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress':
        return { bg: isDark ? 'rgba(59, 130, 246, 0.1)' : '#DBEAFE', text: '#0284C7' };
      case 'Complete':
        return { bg: isDark ? 'rgba(16, 185, 129, 0.1)' : '#D1FAE5', text: '#059669' };
      case 'Pending':
        return { bg: isDark ? 'rgba(245, 158, 11, 0.1)' : '#FEF3C7', text: '#D97706' };
      case 'Approved':
        return { bg: isDark ? 'rgba(139, 92, 246, 0.1)' : '#EDE9FE', text: '#7C3AED' };
      case 'Rejected':
        return { bg: isDark ? 'rgba(239, 68, 68, 0.1)' : '#FEE2E2', text: '#DC2626' };
      default:
        return { bg: '#E5E7EB', text: '#6B7280' };
    }
  };

  const getAvatarColor = (color) => {
    return color;
  };

  return (
    <Box
      sx={{
        backgroundColor: bgColor,
        borderRadius: '16px',
        padding: '24px',
        color: textColor,
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
          Order List
        </h2>

        {/* Filters */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField
            placeholder="Search orders..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(0);
            }}
            InputProps={{
              startAdornment: <SearchOutlined sx={{ mr: 1, fontSize: '20px' }} />,
            }}
            sx={{
              flex: 1,
              minWidth: '200px',
              '& .MuiOutlinedInput-root': {
                color: textColor,
                backgroundColor: isDark ? '#2D3748' : '#F9FAFB',
                '& fieldset': {
                  borderColor: borderColor,
                },
                '&:hover fieldset': {
                  borderColor: '#3B82F6',
                },
              },
              '& .MuiOutlinedInput-input::placeholder': {
                color: isDark ? '#9CA3AF' : '#6B7280',
                opacity: 1,
              },
            }}
          />

          <TextField
            select
            label="Status"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(0);
            }}
            size="small"
            sx={{
              minWidth: '150px',
              '& .MuiOutlinedInput-root': {
                color: textColor,
                '& fieldset': {
                  borderColor: borderColor,
                },
              },
              '& .MuiInputBase-input': {
                color: textColor,
              },
            }}
          >
            <MenuItem value="all">All Status</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Complete">Complete</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Approved">Approved</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </TextField>

          <TextField
            select
            label="Sort By"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            size="small"
            sx={{
              minWidth: '150px',
              '& .MuiOutlinedInput-root': {
                color: textColor,
                '& fieldset': {
                  borderColor: borderColor,
                },
              },
              '& .MuiInputBase-input': {
                color: textColor,
              },
            }}
          >
            <MenuItem value="date">Date</MenuItem>
            <MenuItem value="id">Order ID</MenuItem>
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="status">Status</MenuItem>
          </TextField>

          <Tooltip title="Filter">
            <IconButton size="small" sx={{ color: textColor }}>
              <FilterList />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Table */}
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: bgColor,
          boxShadow: 'none',
          border: `1px solid ${borderColor}`,
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: isDark ? '#2D3748' : '#F9FAFB' }}>
              <TableCell
                sx={{
                  color: isDark ? '#D1D5DB' : '#6B7280',
                  fontWeight: '600',
                  fontSize: '13px',
                  textTransform: 'uppercase',
                  borderBottom: `1px solid ${borderColor}`,
                }}
              >
                Order ID
              </TableCell>
              <TableCell
                sx={{
                  color: isDark ? '#D1D5DB' : '#6B7280',
                  fontWeight: '600',
                  fontSize: '13px',
                  textTransform: 'uppercase',
                  borderBottom: `1px solid ${borderColor}`,
                }}
              >
                User
              </TableCell>
              <TableCell
                sx={{
                  color: isDark ? '#D1D5DB' : '#6B7280',
                  fontWeight: '600',
                  fontSize: '13px',
                  textTransform: 'uppercase',
                  borderBottom: `1px solid ${borderColor}`,
                }}
              >
                Project
              </TableCell>
              <TableCell
                sx={{
                  color: isDark ? '#D1D5DB' : '#6B7280',
                  fontWeight: '600',
                  fontSize: '13px',
                  textTransform: 'uppercase',
                  borderBottom: `1px solid ${borderColor}`,
                }}
              >
                Address
              </TableCell>
              <TableCell
                sx={{
                  color: isDark ? '#D1D5DB' : '#6B7280',
                  fontWeight: '600',
                  fontSize: '13px',
                  textTransform: 'uppercase',
                  borderBottom: `1px solid ${borderColor}`,
                }}
              >
                Date
              </TableCell>
              <TableCell
                sx={{
                  color: isDark ? '#D1D5DB' : '#6B7280',
                  fontWeight: '600',
                  fontSize: '13px',
                  textTransform: 'uppercase',
                  borderBottom: `1px solid ${borderColor}`,
                }}
              >
                Status
              </TableCell>
              <TableCell
                sx={{
                  color: isDark ? '#D1D5DB' : '#6B7280',
                  fontWeight: '600',
                  fontSize: '13px',
                  textTransform: 'uppercase',
                  borderBottom: `1px solid ${borderColor}`,
                  textAlign: 'center',
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedOrders.map((order, index) => (
              <TableRow
                key={index}
                sx={{
                  '&:hover': {
                    backgroundColor: hoverBg,
                  },
                  borderBottom: `1px solid ${borderColor}`,
                }}
              >
                <TableCell
                  sx={{
                    color: textColor,
                    fontWeight: '600',
                    fontSize: '14px',
                  }}
                >
                  {order.id}
                </TableCell>
                <TableCell sx={{ color: textColor, fontSize: '14px' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        backgroundColor: getAvatarColor(order.color),
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#FFFFFF',
                      }}
                    >
                      {order.avatar}
                    </Avatar>
                    {order.user}
                  </Box>
                </TableCell>
                <TableCell sx={{ color: textColor, fontSize: '14px' }}>
                  {order.project}
                </TableCell>
                <TableCell sx={{ color: isDark ? '#D1D5DB' : '#6B7280', fontSize: '14px' }}>
                  {order.address}
                </TableCell>
                <TableCell sx={{ color: isDark ? '#D1D5DB' : '#6B7280', fontSize: '14px' }}>
                  {order.date}
                </TableCell>
                <TableCell sx={{ fontSize: '14px' }}>
                  <Chip
                    label={order.status}
                    size="small"
                    sx={{
                      backgroundColor: getStatusColor(order.status).bg,
                      color: getStatusColor(order.status).text,
                      fontWeight: '600',
                      fontSize: '12px',
                    }}
                  />
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <Tooltip title="More options">
                    <IconButton
                      size="small"
                      sx={{
                        color: textColor,
                        '&:hover': {
                          backgroundColor: isDark ? '#374151' : '#E5E7EB',
                        },
                      }}
                    >
                      <MoreVert fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredOrders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          color: textColor,
          '& .MuiTablePagination-toolbar': {
            backgroundColor: bgColor,
          },
          '& .MuiIconButton-root': {
            color: textColor,
          },
        }}
      />
    </Box>
  );
};

export default OrderList;