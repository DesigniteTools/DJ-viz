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
      <TableContainer sx={{ maxWidth: 1000, height: 500, maxHeight: 500 }} component={Paper}>
        <Table stickyHeader aria-label="dynamic table" sx={{ backgroundColor: "#FDFCF9" }}>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index} sx={{ whiteSpace: "nowrap" }}>
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
        <TableContainer sx={{ maxWidth: 1000, height: 500, maxHeight: 500 }} component={Paper}>
          <Table stickyHeader aria-label="dynamic table" sx={{ backgroundColor: "#FDFCF9" }}>
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell key={index} sx={{ whiteSpace: "nowrap" }}>
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
