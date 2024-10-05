import React from 'react';
import Card from './Card';

function Planets() {
    return (
        <>
            <div className="h-[84vh] flex items-center justify-center p-4 mt-56">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-12 max-w-screen-lg w-full">

                    <Card
                        title="TRAPPIST-1e"
                        desc="One of seven Earth-sized planets orbiting TRAPPIST-1, TRAPPIST-1e is located in the star's habitable zone, making it a candidate for liquid water on its surface."
                        img="https://upload.wikimedia.org/wikipedia/commons/3/38/TRAPPIST-1e_artist_impression_2018.png"
                        link="https://exoplanets.nasa.gov/exoplanet-catalog/3666/trappist-1-e/"
                    />

                    <Card
                        title="Proxima Centauri b"
                        desc="Proxima Centauri b orbits the nearest star to our Sun and lies within the habitable zone, making it an intriguing target for studying potentially habitable worlds."
                        img="https://orbitaltoday.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2023/03/Proxima-b-.jpg.webp"
                        link="https://exoplanets.nasa.gov/exoplanet-catalog/2021/proxima-centauri-b/"
                    />

                    <Card
                        title="HD 209458 b (Osiris)"
                        desc="HD 209458 b, also known as Osiris, was the first exoplanet observed in transit. It has been found to have a tail-like atmosphere evaporating due to its proximity to its host star."
                        img="https://upload.wikimedia.org/wikipedia/commons/8/84/Osiris_%28HD209458b%29_planet_illustration.jpeg"
                        link="https://exoplanets.nasa.gov/exoplanet-catalog/276/hd-209458-b/"
                    />

                    <Card
                        title="Kepler-452b"
                        desc="Kepler-452b is known as Earth’s older cousin. It orbits within the habitable zone of a star similar to our Sun, making it one of the best candidates for studying Earth-like conditions."
                        img="https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/07/24/11/Kepler69c.jpg?quality=75&width=1368&auto=webphttps://scitechdaily.com/images/Observations-Indicate-Water-Rich-Atmosphere-of-a-Super-Earth.jpg"
                        link="https://science.nasa.gov/exoplanet-catalog/kepler-452-b/"
                    />

                    <Card
                        title="GJ 1214 b"
                        desc="GJ 1214 b is a “super-Earth” with a thick atmosphere of gas or water, and it has been a key focus for studying the composition of exoplanet atmospheres."
                        img="https://scitechdaily.com/images/Observations-Indicate-Water-Rich-Atmosphere-of-a-Super-Earth.jpg"
                        link="https://exoplanets.nasa.gov/exoplanet-catalog/439/gj-1214-b/"
                    />

                    <Card
                        title="WASP-12b"
                        desc="WASP-12b is a “hot Jupiter” with an extremely close orbit to its star, resulting in high surface temperatures and an atmosphere slowly being consumed by its host star."
                        img="https://upload.wikimedia.org/wikipedia/commons/a/a2/WASP-12_b.jpg"
                        link="https://exoplanets.nasa.gov/exoplanet-catalog/2436/wasp-12-b/"
                    />
                    <Card
                        title="Kepler-186f"
                        desc="Kepler-186f is the first Earth-size planet found in the habitable zone of another star, offering a significant breakthrough in the search for potentially habitable exoplanets."
                        img="https://upload.wikimedia.org/wikipedia/commons/c/c1/Kepler186f-ArtistConcept-20140417.jpg"
                        link="https://science.nasa.gov/resource/kepler-186f-the-first-earth-size-planet-in-the-habitable-zone-artists-concept/"
                    />

                    <Card
                        title="55 Cancri e"
                        desc="55 Cancri e is a “super-Earth” that is thought to have a rocky surface and possibly oceans of lava due to its close orbit around its star."
                        img="https://live-production.wcms.abc-cdn.net.au/517b569c883c94e18a8100c9136c337b?impolicy=wcms_crop_resize&cropH=377&cropW=670&xPos=0&yPos=30&width=862&height=485"
                        link="https://exoplanets.nasa.gov/exoplanet-catalog/1617/55-cancri-e/"
                    />

                    <Card
                        title="Kepler-22b"
                        desc="Kepler-22b was the first planet found in the habitable zone of a star similar to the Sun, offering one of the earliest hopes for identifying potentially habitable exoplanets."
                        img="https://static.independent.co.uk/s3fs-public/thumbnails/image/2011/12/05/18/Planet.jpg?quality=75&width=1250&crop=3%3A2%2Csmart&auto=webp"
                        link="https://exoplanets.nasa.gov/exoplanet-catalog/2193/kepler-22b/"
                    />


                </div>
            </div>
        </>
    );
}

export default Planets;
