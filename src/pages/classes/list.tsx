import { CreateButton } from "@/components/refine-ui/buttons/create";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { ListView } from "@/components/refine-ui/views/list-view";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ClassDetails } from "@/types";
import { useList } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";

function ClassesList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("all");

  const { query: classesQuery } = useList({
    resource: "classes",
    pagination: {
      pageSize: 100,
    },
  });

  const classes = classesQuery.data?.data ?? [];

  const teacherFilters =
    selectedTeacher === "all"
      ? []
      : [
          {
            field: "teacherId",
            operator: "eq" as const,
            value: selectedTeacher,
          },
        ];

  const searchFilters = searchQuery
    ? [
        {
          field: "name",
          operator: "contains" as const,
          value: searchQuery,
        },
      ]
    : [];

  const columns = useMemo<ColumnDef<ClassDetails>[]>(
    () => [
      {
        id: "bannerUrl",
        accessorKey: "bannerUrl",
        size: 80,
        header: () => <p>Banner</p>,
        cell: ({ getValue }) => (
          <img
            src={getValue<string>()}
            alt="Class name"
            className="aspect-square size-10 rounded-xl"
          />
        ),
      },
      {
        id: "name",
        accessorKey: "name",
        size: 200,
        header: () => <p>Class Name</p>,
        cell: ({ getValue }) => <p>{getValue<string>()}</p>,
      },
      {
        id: "status",
        accessorKey: "status",
        header: () => <p>Status</p>,
        cell: ({ getValue }) => <Badge>{getValue<string>()}</Badge>,
      },
      {
        id: "description",
        accessorKey: "description",
        size: 150,
        header: () => <p>Description</p>,
        cell: ({ getValue }) => (
          <p className="truncate">{getValue<string>()}</p>
        ),
      },
      {
        id: "subject",
        accessorKey: "subject.name",
        header: () => <p>Subject</p>,
        cell: ({ getValue }) => <p>{getValue<string>()}</p>,
      },

      {
        id: "teacher",
        accessorKey: "teacher.name",
        header: () => <p>Teacher</p>,
        cell: ({ getValue }) => <p>{getValue<string>()}</p>,
      },
    ],
    [],
  );

  const subjectTable = useTable<ClassDetails>({
    columns,
    refineCoreProps: {
      resource: "classes",
      pagination: {
        pageSize: 10,
        mode: "server",
      },
      filters: {
        permanent: [...teacherFilters, ...searchFilters],
      },
      sorters: {
        initial: [{ field: "id", order: "desc" }],
      },
    },
  });

  return (
    <ListView>
      <Breadcrumb />
      <div>
        <h1>Class List</h1>
        <p>List of all classes available in the system.</p>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Input
            placeholder="Search for Class name..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Teachers</SelectItem>
              {classes.map(({ teacher }) => (
                <SelectItem key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <CreateButton className="col-span-2 w-full" />
        </div>

        <DataTable table={subjectTable} />
      </div>
    </ListView>
  );
}

export default ClassesList;
