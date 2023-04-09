import { useEffect, useState } from "react";

import { Layout } from "@/components/layouts";
import { NoFavorites } from "@/components/UI";
import { FavoritePokemons } from "@/components/UI/FavoritePokemons";
import { localFavorites } from "@/utils"

function FavoritePage() {
  const [favorites, setFavorites] = useState<number[]>([]);
  useEffect(() => {
    setFavorites(localFavorites.pokemons());
  }, []);

  return (
    <Layout title="Favorites">
      {favorites.length == 0 
        ? <NoFavorites /> 
        : <FavoritePokemons pokemons={favorites} />
      }
    </Layout>
  );
}

export default FavoritePage;
