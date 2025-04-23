
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DonationManager() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Manajemen Donasi</CardTitle>
        <CardDescription>Kelola dan pantau data donasi yang diterima</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center py-8 text-muted-foreground">
          Fungsionalitas manajemen donasi akan diimplementasikan di sini
        </p>
      </CardContent>
    </Card>
  );
}
