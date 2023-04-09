import { Card, Grid } from '@nextui-org/react'
import React from 'react'
import { FC } from 'react'
import { FavoriteCardPokemon } from './FavoriteCardPokemon'

interface Props {
  pokemons: number[]
}

export const FavoritePokemons: FC<Props> = ({pokemons}) => {
  return (
    <Grid.Container gap={2} direction="row" justify='flex-start'>
      {
        pokemons.map((pokemon, index) => (
          <FavoriteCardPokemon key={index} id={pokemon}/>
      ))}
    </Grid.Container>
  )
}
