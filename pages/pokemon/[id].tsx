import { useState } from 'react';

import { GetStaticPaths, NextPage } from 'next';
import { GetStaticProps } from "next"

import confetti from 'canvas-confetti';

import { Layout } from "@/components/layouts"
import { Pokemon } from "@/interfaces"
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import { pokeApi } from '@/api';
import { getPokemonInfo, localFavorites } from '@/utils';

interface Props {
  pokemon: Pokemon
}


const PokemonPage: NextPage<Props> = ({pokemon}) => {

  const [isFavorite, setIsFavorite] = useState<boolean>(localFavorites.existInFavorites(pokemon.id));

  const onToogleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setIsFavorite(!isFavorite);

    if( !isFavorite) {
      confetti({
        zIndex: 999,
        particleCount: 100,
        spread: 160,
        angle: -100,
        origin: {
          x:1,
          y:0
        }
      })
    }
  }

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{marginTop: '5px'}} gap={2}>
        <Grid xs={12} sm={ 4 }>
          <Card hoverable css={{paddin: '30px'}}>
            <Card.Body>
              <Card.Image
                src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'} 
                alt={pokemon.name}
                width="100%"
                height={200}
              >

              </Card.Image>
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={ 8 }>
          <Card>
            <Card.Header css={{display: 'flex', justifyContent: 'space-between'}}>
              <Text h1  transform='capitalize'>
                {pokemon.name}
              </Text>
              <Button
                color='gradient'
                ghost = {!isFavorite}
                onClick={onToogleFavorite}
              >
                {isFavorite ? 'En Favoritos' : 'Guardar en Favoritos'}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container direction='row' display='flex' gap={0}>
                <Image src={pokemon.sprites.front_default} alt={pokemon.name} width={100} height={100}/>
                <Image src={pokemon.sprites.back_default} alt={pokemon.name} width={100} height={100}/>
                <Image src={pokemon.sprites.front_shiny} alt={pokemon.name} width={100} height={100}/>
                <Image src={pokemon.sprites.back_shiny} alt={pokemon.name} width={100} height={100}/>
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout> 
  )
}


export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pokemons151 = [...Array(151)].map((value, index) => (`${index+1}`))
  return {
    paths: pokemons151.map((id) => ({
      params: {id}
    })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {

  const {id} = params as {id: string}
  const pokemon = await getPokemonInfo(id);

  return {
    props: {
      pokemon,
    },
  };
};

export default PokemonPage;