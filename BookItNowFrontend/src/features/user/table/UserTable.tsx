import React, { useState } from "react";
import {Table,TableHeader,TableColumn,TableBody,TableRow,TableCell,Input,Button,DropdownTrigger,Dropdown,DropdownMenu,DropdownItem,User,Pagination,Selection
} from "@nextui-org/react";
import { VerticalDotsIcon } from "./VerticalDotsIcon";
import { SearchIcon } from "./SearchIcon";
import { columns, companyData } from "./data";
import UserBookAppointment from "../UserBookAppointment";
import { AppointmentGetAllResult } from "../../../services/appointment/AppointmentGetAllFetch";
import { CompanyAppointmentData, CompanyDataResponse } from "../../../lib/constants/interfaces/CompanyInterfaces";
import CompanyAppointmentDataFetch from "../../../services/company/CompanyAppointmentDataFetch";




const INITIAL_VISIBLE_COLUMNS = ["companyName", "serviceName", "serviceDescription", "email", "actions"];

type User = typeof companyData[0];

export default function App({ companyData, companyAppointments, userData}: any) {

 const [filteredAppointments, setFilteredAppointments] = useState<CompanyAppointmentData[]>();


  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));

  const [rowsPerPage, setRowsPerPage] = React.useState(10); // was 5
  const [page, setPage] = React.useState(1);

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const pages = Math.ceil(companyData.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const handleBookButtonClick = async (companyId: any) => {

  const response = await CompanyAppointmentDataFetch(Number(companyId));    
    

    if(response.success === true)
    {
      setFilteredAppointments(response.data);
    }
    

    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

 
  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...companyData];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.companyName.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredUsers;
  }, [companyData, filterValue]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];
    
    switch (columnKey) {
      case "companyName":
        return (
          <User
            avatarProps={{ radius: "full", size: "sm", src: user.avatar }}
            classNames={{
              description: "text-default-500",
            }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );

        case "serviceName":
          return(
            <div>{cellValue}</div>
          )

        case "serviceDescription":
         return(
          <div>{cellValue}</div>
         )


      case "actions":
        return (
          <div className="relative flex justify-start items-center gap-2">
            <Dropdown className="bg-background border-1 border-default-200">
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light" className="text-default-400">
                  <VerticalDotsIcon />
                </Button>
              </DropdownTrigger>
              <DropdownMenu onAction={(e) => handleBookButtonClick(e)}>
                <DropdownItem key={user.id}>Book</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);


  const topContent = React.useMemo(() => {                    // TOP CONTENT FOR SEARCH INPUT FIELD
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
            placeholder="Search by name..."
            size="sm"
            startContent={<SearchIcon className="text-default-400" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
        </div>
      </div>
    );
  }, [filterValue, visibleColumns, onSearchChange, companyData.length, hasSearchFilter]);

  const bottomContent = React.useMemo(() => {                           // BOTTOM CONTENT FOR PAGINATION
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="flat"
          onChange={setPage}
        />
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    [],
  );




  return (
    <div className="overflow-x-auto overflow-y-hidden animate__animated animate__backInUp">
      
    {isModalOpen && (
        <UserBookAppointment isOpen={isModalOpen} onClose={handleModalClose} companyAppointments={filteredAppointments} userData={userData} />
      )}
<Table
      isCompact
      removeWrapper
      aria-label="Example table with custom cells, pagination and sorting"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      checkboxesProps={{
        classNames: {
          wrapper: "after:bg-foreground after:text-background text-background",
        },
      }}
      classNames={classNames}
      selectedKeys={selectedKeys}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No companies found"} items={items}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>


    </div>
    
  );
}