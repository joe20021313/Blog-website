

'use client';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";


import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBox() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    router.push(`/?search=${encodeURIComponent(query)}`);
  };

  return (
        <form onSubmit={handleSubmit} style={{ maxWidth: "100%", margin: "1 auto", display: "flex", justifyContent: "center", paddingTop:"5rem" }}>
            <div className="container" style={{ maxWidth: "80%", display: "flex", justifyContent: "center" }}>
                <TextField
                    style={{ paddingBottom: "1rem", width: "clamp(250px, 100%, 2000px)", margin: "1 auto" }}
                    variant="outlined"
                    placeholder="Search..."
                    fullWidth
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Button type="submit">Search</Button>
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
        </form>

  );
}
