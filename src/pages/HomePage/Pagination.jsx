import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationRounded() {
  return (
    <Stack spacing={1}>
      <Pagination count={10} shape="rounded" />
    </Stack>
  );
}
