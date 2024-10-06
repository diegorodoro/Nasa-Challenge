import mars from "../assets/images/8k_mars.jpg";
import mercury from "../assets/images/8k_mercury.jpg";
import venus from "../assets/images/4k_venus_atmosphere.jpg";
import earth from "../assets/images/8k_earth_daymap.jpg";
import jupiter from "../assets/images/8k_jupiter.jpg";
import uranus from "../assets/images/2k_uranus.jpg";
import neptune from "../assets/images/2k_neptune.jpg";
import saturn from "../assets/images/8k_saturn.jpg";




const planets = [
    {
        name: "Mercury",
        diameter: "4,880 km",
        distanceFromSun: "57.91 million km",
        moons: 0,
        description: "Mercury is the closest planet to the Sun and has no atmosphere.",
        mesh: mercury,
    },
    {
        name: "Venus",
        diameter: "12,104 km",
        distanceFromSun: "108.2 million km",
        moons: 0,
        description: "Venus is similar in structure to Earth but has a thick toxic atmosphere.",
        mesh: venus,
    },
    {
        name: "Earth",
        diameter: "12,742 km",
        distanceFromSun: "149.6 million km",
        moons: 1,
        description: "Earth is the only planet known to support life.",
        mesh: earth

    },
    {
        name: "Mars",
        diameter: "6,779 km",
        distanceFromSun: "227.9 million km",
        moons: 2,
        description: "The Red Planet is the fourth planet from the Sun and the second-smallest planet in the Solar System, being larger than only Mercury.",
        mesh: mars,
    },
    {
        name: "Jupiter",
        diameter: "139,820 km",
        distanceFromSun: "778.5 million km",
        moons: 79,
        description: "Jupiter is the largest planet in our solar system and is a gas giant.",
        mesh: jupiter,
    },
    {
        name: "Saturn",
        diameter: "116,460 km",
        distanceFromSun: "1.434 billion km",
        moons: 83,
        description: "Saturn is known for its stunning ring system.",
        mesh: saturn,

    },
    {
        name: "Uranus",
        diameter: "50,724 km",
        distanceFromSun: "2.871 billion km",
        moons: 27,
        description: "Uranus rotates on its side and has a faint ring system.",
        mesh: uranus,
    },
    {
        name: "Neptune",
        diameter: "49,244 km",
        distanceFromSun: "4.495 billion km",
        moons: 14,
        description: "Neptune is known for its deep blue color and strong winds.",
        mesh: neptune,
    }
];

export default planets;