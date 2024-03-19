import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";

export default function Details({ data, sector, activeSmell }) {
  if (!sector) {
    return (
      <Card sx={{ backgroundColor: "#FDFCF9", width: 1000, height: 500 }}>
        <CardContent
          sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
          <Typography variant="body1" align="center">
            Select a sector to view details
          </Typography>
        </CardContent>
      </Card>
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
          <Table aria-label="dynamic table" sx={{ backgroundColor: "#FDFCF9" }}>
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell key={index}>{column}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((item, index) => (
                <TableRow key={index}>
                  {columns.map((column, columnIndex) => (
                    <TableCell key={columnIndex}>{item[column]}</TableCell>
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
