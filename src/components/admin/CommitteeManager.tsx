
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function CommitteeManager() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Manajemen Pengurus</CardTitle>
        <CardDescription>Kelola data struktur pengurus organisasi</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center py-8 text-muted-foreground">
          Fungsionalitas manajemen pengurus akan diimplementasikan di sini
        </p>
      </CardContent>
    </Card>
  );
}
