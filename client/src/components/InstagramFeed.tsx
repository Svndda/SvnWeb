import { useEffect, useState } from 'react';
import { Box, Typography, ImageList, ImageListItem, Link, Button, Skeleton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';

export const InstagramFeed = ({ username }: { username: string }) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    const fetchPosts = async () => {
        try {
        console.log("Iniciando petición a /api/instagram...");
        const response = await fetch(`/api/instagram?username=${username}`);

        // 1. Verificamos el estado HTTP
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Error HTTP ${response.status}:`, errorText);
            setLoading(false);
            return;
        }

        // 2. Verificamos el Content-Type
        const contentType = response.headers.get("content-type");
        console.log("Content-Type recibido:", contentType);

        if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            console.log("Datos JSON recibidos:", data);

            if (data.result?.edges) {
            setPosts(data.result.edges.slice(0, 12));
            } else {
            console.warn("Estructura de datos inesperada de RapidAPI:", data);
            }
        } else {
            // 3. AQUÍ ESTÁ EL DEBUG CLAVE: Capturamos lo que NO es JSON
            const rawText = await response.text();
            console.error("DEBUG: La respuesta NO es JSON.");
            console.log("CONTENIDO RECIBIDO (Primeros 500 caracteres):", rawText.substring(0, 500));
            
            if (rawText.includes("<!doctype html>") || rawText.includes("<script")) {
            console.error("ANÁLISIS: Estás recibiendo el HTML de tu propia página. Vite no está sirviendo la ruta /api.");
            }
        }
        } catch (error) {
        console.error("Error crítico en fetchPosts:", error);
        } finally {
        setLoading(false);
        }
    };

    fetchPosts();
    }, [username]);

  return (
    <Box sx={{ width: '100%', py: 4 }}>
      {/* Header del Componente */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3, gap: 1 }}>
        <InstagramIcon sx={{ color: '#E1306C' }} />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Follow me <Link href={`https://instagram.com/${username}`} target="_blank" sx={{ textDecoration: 'none' }}>@{username}</Link>
        </Typography>
      </Box>

      {/* Grid de Imágenes */}
      <ImageList cols={3} gap={8} sx={{ mb: 4, borderRadius: 2, overflow: 'hidden' }}>
        {loading 
          ? Array(12).fill(0).map((_, i) => (
              <Skeleton key={i} variant="rectangular" sx={{ width: '100%', aspectRatio: '1/1' }} />
            ))
          : posts.map((item) => (
              <ImageListItem 
                key={item.node.id} 
                component="a" 
                href={`https://instagram.com/p/${item.node.code}`} 
                target="_blank"
              >
                <img 
                  src={item.node.image_versions2.candidates[0].url} 
                  alt={item.node.caption?.text || "Post"} 
                  loading="lazy" 
                  style={{ aspectRatio: '1/1', objectFit: 'cover' }} 
                />
              </ImageListItem>
            ))
        }
      </ImageList>

      <Box sx={{ textAlign: 'center' }}>
        <Button variant="outlined" href={`https://instagram.com/${username}`} target="_blank">
          View on Instagram
        </Button>
      </Box>
    </Box>
  );
};