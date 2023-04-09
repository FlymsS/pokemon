import { Grid } from "@nextui-org/react";
import { GetStaticProps, NextPage } from "next";
import { Inter } from "next/font/google";
import { Layout } from "../components/layouts/";
import { pokeApi } from "../api";
import { PokemonListResponse, SmallPokemon } from "../interfaces/pokemon-list";
import { PokemonCard } from "@/components/pokemon";

const inter = Inter({ subsets: ["latin"] });

interface Props {
  pokemons: SmallPokemon[];
}

const HomePag: NextPage<Props> = (props) => {
  return (
    <>
      <Layout title="Listado de pokemons">
        <Grid.Container gap={2} justify="flex-start">
          {props.pokemons.map((pokemon) => (  
            <PokemonCard pokemon={pokemon} key={pokemon.id}/>
          ))}
        </Grid.Container>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");
  const pokemons: SmallPokemon[] = data.results.map((pokemon, index) => {
    return {
      name: pokemon.name,
      url: pokemon.url,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
        index + 1
      }.svg`,
      id: index + 1,
    };
  });
  //"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg",
  return {
    props: {
      pokemons,
    },
  };
};

export default HomePag;
