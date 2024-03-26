import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";

export default function Details({ data, sector, activeSmell }) {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  if (!sector) {
    const columns = Object.keys(data[0] || {});
    return (
      <TableContainer
        sx={{ maxWidth: 850, height: 500, maxHeight: 500 }}
        component={Paper}
        style={{ backgroundColor: "#F9F6EE" }}>
        <Table
          size="small"
          stickyHeader
          aria-label="dynamic table"
          sx={{ backgroundColor: "#F9F6EE" }}>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  sx={{ backgroundColor: "#003f5c", color: "white", whiteSpace: "nowrap" }}>
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                {columns.map((column, columnIndex) => (
                  <TableCell key={columnIndex} sx={{ whiteSpace: "nowrap" }}>
                    {item[column]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  const formattedActiveSmell = activeSmell.replace("Smells", " Smell");
  const filteredData = data.filter((item) => item[formattedActiveSmell] === sector);
  const columns = filteredData.length > 0 ? Object.keys(filteredData[0]) : [];

  return (
    <div className="details">
      {filteredData.length === 0 ? (
        <div>No data available for selected sector</div>
      ) : (
        <TableContainer
          sx={{ maxWidth: 850, height: 500, maxHeight: 500 }}
          component={Paper}
          style={{ backgroundColor: "#F9F6EE" }}>
          <Table
            size="small"
            stickyHeader
            aria-label="dynamic table"
            sx={{ backgroundColor: "#F9F6EE" }}>
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    key={index}
                    sx={{ backgroundColor: "#003f5c", color: "white", whiteSpace: "nowrap" }}>
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((item, index) => (
                <TableRow key={index}>
                  {columns.map((column, columnIndex) => (
                    <TableCell key={columnIndex} sx={{ whiteSpace: "nowrap" }}>
                      {item[column]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
