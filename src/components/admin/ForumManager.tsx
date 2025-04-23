
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ForumManager() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Manajemen Forum</CardTitle>
        <CardDescription>Kelola diskusi dan topik forum organisasi</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center py-8 text-muted-foreground">
          Fungsionalitas manajemen forum akan diimplementasikan di sini
        </p>
      </CardContent>
    </Card>
  );
}
