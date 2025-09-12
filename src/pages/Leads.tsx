import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Filter,
  ChevronDown,
  Plus,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  List,
  Grid3X3,
} from "lucide-react";

const sampleLeads = [
  {
    id: 1,
    name: "Christopher Maclead",
    company: "Rangoni Of Florence",
    email: "christopher.maclead@noemail.invalid",
    phone: "555-555-5555",
    status: "Qualified",
    source: "Web",
  },
  {
    id: 2,
    name: "Carissa Kidman",
    company: "Oh My Goodknits Inc",
    email: "carissa.kidman@noemail.invalid",
    phone: "555-555-5556",
    status: "New",
    source: "Referral",
  },
  {
    id: 3,
    name: "James Merced",
    company: "Kwik Kopy Printing",
    email: "james.merced@noemail.invalid",
    phone: "555-555-5557",
    status: "Contacted",
    source: "Campaign",
  },
  {
    id: 4,
    name: "Tresa Sweely",
    company: "Morlong Associates",
    email: "tresa.sweely@noemail.invalid",
    phone: "555-555-5558",
    status: "Qualified",
    source: "Web",
  },
  {
    id: 5,
    name: "Felix Hirpara",
    company: "Chapman",
    email: "felix.hirpara@noemail.invalid",
    phone: "555-555-5559",
    status: "Working",
    source: "Cold Call",
  },
  {
    id: 6,
    name: "Kayleigh Lace",
    company: "Printing Dimensions",
    email: "kayleigh.lace@noemail.invalid",
    phone: "555-555-5560",
    status: "Nurturing",
    source: "Web",
  },
  {
    id: 7,
    name: "Yvonne Tjepkema",
    company: "Grayson",
    email: "yvonne.tjepkema@noemail.invalid",
    phone: "555-555-5561",
    status: "Qualified",
    source: "Referral",
  },
  {
    id: 8,
    name: "Michael Ruta",
    company: "Buckley Miller & Wright",
    email: "michael.gruta@noemail.invalid",
    phone: "555-555-5562",
    status: "New",
    source: "Campaign",
  },
  {
    id: 9,
    name: "Theola Frey",
    company: "Dal Tile Corporation",
    email: "theola.frey@noemail.invalid",
    phone: "555-555-5563",
    status: "Contacted",
    source: "Web",
  },
  {
    id: 10,
    name: "Sage Wieser",
    company: "Truhlar And Truhlar Attys",
    email: "sage.wieser@noemail.invalid",
    phone: "555-555-5564",
    status: "Working",
    source: "Cold Call",
  },
];

const systemFilters = [
  "Touched Records",
  "Untouched Records", 
  "Record Action",
  "Related Records Action",
  "Locked",
  "Latest Email Status",
  "Activities",
  "Campaigns",
  "Cadences",
];

const fieldFilters = [
  "Annual Revenue",
  "City",
  "Company",
  "Connected To",
  "Country",
  "Created By",
  "Created Time",
  "Email",
  "Email Opt Out",
  "Fax",
  "First Name",
  "Industry",
  "Last Name",
  "Lead Owner",
  "Lead Source",
  "Lead Status",
  "Mobile",
  "Modified By",
  "Modified Time",
  "No. of Employees",
  "Phone",
  "Rating",
  "Salutation",
  "Secondary Email",
  "Skype ID",
  "State",
  "Street",
  "Title",
  "Twitter",
  "Website",
  "Zip Code",
];

export default function Leads() {
  const [selectedLeads, setSelectedLeads] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const filteredLeads = sampleLeads.filter(lead =>
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalRecords = filteredLeads.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const startRecord = (currentPage - 1) * recordsPerPage + 1;
  const endRecord = Math.min(currentPage * recordsPerPage, totalRecords);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedLeads(filteredLeads.map(lead => lead.id));
    } else {
      setSelectedLeads([]);
    }
  };

  const handleSelectLead = (leadId: number, checked: boolean) => {
    if (checked) {
      setSelectedLeads([...selectedLeads, leadId]);
    } else {
      setSelectedLeads(selectedLeads.filter(id => id !== leadId));
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Qualified": return "default";
      case "New": return "secondary";
      case "Contacted": return "outline";
      case "Working": return "destructive";
      case "Nurturing": return "secondary";
      default: return "outline";
    }
  };

  return (
    <div className="flex h-full bg-background">
      {/* Filter Sidebar */}
      <div className="w-80 border-r bg-muted/30 p-4 space-y-4">
        <div>
          <h3 className="font-semibold mb-3">Filter Leads by</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Separator />

        <div>
          <div className="flex items-center gap-2 mb-3">
            <ChevronDown className="h-4 w-4" />
            <h4 className="font-medium">System Defined Filters</h4>
          </div>
          <div className="space-y-2">
            {systemFilters.map((filter) => (
              <div key={filter} className="flex items-center space-x-2">
                <Checkbox id={filter} />
                <label htmlFor={filter} className="text-sm">
                  {filter}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <div className="flex items-center gap-2 mb-3">
            <ChevronDown className="h-4 w-4" />
            <h4 className="font-medium">Filter By Fields</h4>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {fieldFilters.map((filter) => (
              <div key={filter} className="flex items-center space-x-2">
                <Checkbox id={filter} />
                <label htmlFor={filter} className="text-sm">
                  {filter}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      All Leads
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>All Leads</DropdownMenuItem>
                    <DropdownMenuItem>My Leads</DropdownMenuItem>
                    <DropdownMenuItem>Recently Modified</DropdownMenuItem>
                    <DropdownMenuItem>Today's Leads</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setViewMode(viewMode === "list" ? "grid" : "list")}>
                {viewMode === "list" ? <Grid3X3 className="h-4 w-4" /> : <List className="h-4 w-4" />}
              </Button>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create Lead
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Actions
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Mass Update</DropdownMenuItem>
                  <DropdownMenuItem>Mass Delete</DropdownMenuItem>
                  <DropdownMenuItem>Export</DropdownMenuItem>
                  <DropdownMenuItem>Import</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Total Records {totalRecords}</span>
            <div className="flex items-center gap-4">
              <Select defaultValue="30">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 Records Per Page</SelectItem>
                  <SelectItem value="20">20 Records Per Page</SelectItem>
                  <SelectItem value="30">30 Records Per Page</SelectItem>
                  <SelectItem value="50">50 Records Per Page</SelectItem>
                </SelectContent>
              </Select>
              <span>{startRecord} - {endRecord}</span>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-background">
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedLeads.length === filteredLeads.length}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Lead Name</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Source</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage).map((lead) => (
                <TableRow key={lead.id} className="hover:bg-muted/50">
                  <TableCell>
                    <Checkbox
                      checked={selectedLeads.includes(lead.id)}
                      onCheckedChange={(checked) => handleSelectLead(lead.id, !!checked)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <div>
                      <div className="font-medium">{lead.name}</div>
                      <div className="text-sm text-muted-foreground">(Sample)</div>
                    </div>
                  </TableCell>
                  <TableCell>{lead.company}</TableCell>
                  <TableCell className="text-blue-600">{lead.email}</TableCell>
                  <TableCell>{lead.phone}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(lead.status)}>
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{lead.source}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>View</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Convert</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}