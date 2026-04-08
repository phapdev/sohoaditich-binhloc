import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import martyrsData from "@/data/martyrs.json";
import { motion } from "framer-motion";

type Martyr = {
  id: number;
  name: string;
  birthYear: number;
  deathYear: number;
  hometown: string;
  rank: string;
  description: string;
};

export function MartyrSearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Martyr | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  const martyrs = martyrsData as Martyr[];

  const handleSort = (key: keyof Martyr) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const filteredAndSortedMartyrs = useMemo(() => {
    let filtered = martyrs.filter(
      (martyr) =>
        martyr.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        martyr.hometown.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key!];
        const bValue = b[sortConfig.key!];

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortConfig.direction === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortConfig.direction === "asc"
            ? aValue - bValue
            : bValue - aValue;
        }

        return 0;
      });
    }

    return filtered;
  }, [martyrs, searchTerm, sortConfig]);

  const SortableHeader = ({
    columnKey,
    label,
  }: {
    columnKey: keyof Martyr;
    label: string;
  }) => (
    <TableHead
      className="cursor-pointer select-none hover:bg-muted/50"
      onClick={() => handleSort(columnKey)}
    >
      <div className="flex items-center space-x-2">
        <span>{label}</span>
        {sortConfig.key === columnKey && (
          <span className="text-xs">
            {sortConfig.direction === "asc" ? "↑" : "↓"}
          </span>
        )}
      </div>
    </TableHead>
  );

  return (
    <div className="space-y-6 p-4 pt-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-2 text-3xl font-bold">Tra cứu thông tin Liệt sĩ</h1>
        <p className="mb-6 text-lg font-semibold text-primary">
          Đời đời nhớ ơn các Anh hùng Liệt sĩ
        </p>
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle>Tìm kiếm</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm theo tên hoặc quê quán..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Danh sách Liệt sĩ ({filteredAndSortedMartyrs.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <SortableHeader columnKey="name" label="Họ và tên" />
                  <SortableHeader columnKey="birthYear" label="Năm sinh" />
                  <SortableHeader columnKey="deathYear" label="Năm hy sinh" />
                  <SortableHeader columnKey="hometown" label="Quê quán" />
                  <SortableHeader columnKey="rank" label="Cấp bậc" />
                  <TableHead>Mô tả</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedMartyrs.length > 0 ? (
                  filteredAndSortedMartyrs.map((martyr) => (
                    <TableRow
                      key={martyr.id}
                      className="cursor-pointer hover:bg-muted/50"
                    >
                      <TableCell className="font-medium">
                        <Link
                          to={`/martyrs/${martyr.id}`}
                          className="flex items-center space-x-2 hover:text-primary"
                        >
                          <span>{martyr.name}</span>
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      </TableCell>
                      <TableCell>{martyr.birthYear}</TableCell>
                      <TableCell>{martyr.deathYear}</TableCell>
                      <TableCell>{martyr.hometown}</TableCell>
                      <TableCell>{martyr.rank}</TableCell>
                      <TableCell className="max-w-md">
                        {martyr.description}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center text-muted-foreground"
                    >
                      Không tìm thấy kết quả
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
