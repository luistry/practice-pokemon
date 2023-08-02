import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, CardMedia, Typography, Button, CardContent,Grid } from "@mui/material";

const Pokemones = () => {
  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [id, setId] = useState(1);


  const ConsultaApi = async (id) => {
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
      const config = {
        headers: { 'Access-Control-Allow-Origin': '*' }
      };
      const { 
        data: {
          sprites: { front_default: imageUrl },
          name,
          height,
          weight,
          stats: [{ base_stat: vida }],
          types: [{ type: { name: tipo } }]
        }
      } = await axios(url, config);
      
      setPokemon({ imageUrl, name, height, vida, tipo, weight });
      
      setId(id); // actualizar la ID
      setLoading(false);
      
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    ConsultaApi(id);
  }, [id]);

  const handleFetchMore = () => {
    setLoading(true);
    const randomId = Math.floor(Math.random() * 150) + 1;
    setId(randomId);
    setPokemon({});
  };

  const handlePrevPokemon = () => {
    setLoading(true);
    setId(id => id > 1 ? id - 1 : 1);
    setPokemon({});
  };

  const handleNextPokemon = () => {
    setLoading(true);
    setId(id => id < 150 ? id + 1 : 150);
    setPokemon({});
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;

  return (
    <Container>
      <Typography variant="h3" color="initial" textAlign="center">
        Pokemon:
      </Typography>
      <Card
  sx={{
    bgcolor: 
      pokemon.tipo === "normal" ? "#A8A77A" :
      pokemon.tipo === "fire" ? "#EE8130" :
      pokemon.tipo === "water" ? "#6390F0" :
      pokemon.tipo === "electric" ? "#F7D02C" :
      pokemon.tipo === "grass" ? "#7AC74C" :
      pokemon.tipo === "ice" ? "#96D9D6" :
      pokemon.tipo === "fighting" ? "#C22E28" :
      pokemon.tipo === "poison" ? "#A33EA1" :
      pokemon.tipo === "ground" ? "#E2BF65" :
      pokemon.tipo === "flying" ? "#A98FF3" :
      pokemon.tipo === "psychic" ? "#F95587" :
      pokemon.tipo === "bug" ? "#A6B91A" :
      pokemon.tipo === "rock" ? "#B6A136" :
      pokemon.tipo === "ghost" ? "#735797" :
      pokemon.tipo === "dragon" ? "#6F35FC" :
      pokemon.tipo === "dark" ? "#705746" :
      pokemon.tipo === "steel" ? "#B7B7CE" :
      pokemon.tipo === "fairy" ? "#D685AD" : "#fff",
    boxShadow: "0px 0px 10px 1px rgba(0,0,0,0.2)"
  }}
>

        <CardMedia
          component="img"
          height={600}
          width={300}
          alt={`imagen del pokemon: ${pokemon.name}`}
          image={pokemon.imageUrl}
        />
        <CardContent>
          <Typography variant="h3" color="initial" textAlign="center">
            {pokemon.name}
          </Typography>
          <Typography variant="h4" textAlign="center" color="initial">
            Stats:
          </Typography>
          <Typography variant="body1" textAlign="center" color="initial">
            Altura: {pokemon.height}
          </Typography>
          <Typography variant="body1" textAlign="center" color="initial">
            Peso: {pokemon.weight}
          </Typography>
          <Typography variant="body1" textAlign="center" color="initial">
            ID: {id}
          </Typography>
          <Typography variant="body1" textAlign="center" color="initial">
            Vida del Pokemon: {pokemon.vida}
          </Typography>
          <Typography variant="body1" textAlign="center" color="initial">
            Tipo: {pokemon.tipo}
          </Typography>
        </CardContent>
<Grid textAlign={"center"}>
  <Button type="button" textAlign={"center"} variant="contained" onClick={handleFetchMore}>
          Pokemon Aleatorio
        </Button>
</Grid>
<Grid container direction="row" alignItems="center" justifyContent="space-between">
  <Grid item>
    <Button variant="contained" onClick={handlePrevPokemon}>←</Button>
  </Grid>
  <Grid item>
    <Button variant="contained" onClick={handleNextPokemon}>→</Button>
  </Grid>
</Grid>

        
      </Card>
    </Container>
  );
};

export default Pokemones;
