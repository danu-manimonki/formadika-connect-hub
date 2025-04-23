
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactManager() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Manajemen Kontak</CardTitle>
        <CardDescription>Kelola informasi kontak organisasi</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center py-8 text-muted-foreground">
          Fungsionalitas manajemen kontak akan diimplementasikan di sini
        </p>
      </CardContent>
    </Card>
  );
}
