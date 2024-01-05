export type FilmInfo = {
  id: string;
  name: string;
  genre: string;
  released: number;
  backgroundImage: string;
  backgroundColor: string;
  posterImage: string;
  rating: number;
  runTime: number;
  scoresCount: number;
  videoLink: string;
  isFavorite: boolean;
  starring: string[];
  description: string;
  director: string;
}

export const FILM_LIST: FilmInfo[] = [
  {
    id: 'd1033708-4b29-4f5e-9572-f4f1b90389de',
    name: 'Fantastic Beasts: The Crimes of Grindelwald',
    posterImage: 'https://13.design.htmlacademy.pro/static/film/poster/Fantastic_Beasts.jpg',
    backgroundImage: 'https://13.design.htmlacademy.pro/static/film/background/Fantastic_Beasts.jpg',
    backgroundColor: '#B6A99F',
    videoLink: 'https://13.design.htmlacademy.pro/static/film/video/bike.mp4',
    description: 'In an effort to thwart Grindelwald\'s plans of raising pure-blood wizards to rule over all non-magical beings, Albus Dumbledore enlists his former student Newt Scamander, who agrees to help, though he\'s unaware of the dangers that lie ahead. Lines are drawn as love and loyalty are tested, even among the truest friends and family, in an increasingly divided wizarding world.',
    rating: 3.4,
    scoresCount: 160757,
    director: 'David Yates',
    starring: [
      'Eddie Redmayne',
      'Katherine Waterston',
      'Dan Fogler'
    ],
    runTime: 134,
    genre: 'Fantasy',
    released: 2018,
    isFavorite: false
  },
  {
    id: '3e1c4e03-7d50-43d1-ac9d-fa968f5c9e39',
    name: 'Bohemian Rhapsody',
    posterImage: 'https://13.design.htmlacademy.pro/static/film/poster/Bohemian_Rhapsody.jpg',
    backgroundImage: 'https://13.design.htmlacademy.pro/static/film/background/Bohemian_Rhapsody.jpg',
    backgroundColor: '#929FA5',
    videoLink: 'https://13.design.htmlacademy.pro/static/film/video/bike.mp4',
    description: 'Bohemian Rhapsody is a foot-stomping celebration of Queen, their music and their extraordinary lead singer Freddie Mercury. Freddie defied stereotypes and shattered convention to become one of the most beloved entertainers on the planet. The film traces the meteoric rise of the band through their iconic songs and revolutionary sound. They reach unparalleled success, but in an unexpected turn Freddie, surrounded by darker influences, shuns Queen in pursuit of his solo career. Having suffered greatly without the collaboration of Queen, Freddie manages to reunite with his bandmates just in time for Live Aid. While bravely facing a recent AIDS diagnosis, Freddie leads the band in one of the greatest performances in the history of rock music. Queen cements a legacy that continues to inspire outsiders, dreamers and music lovers to this day.',
    rating: 6.1,
    scoresCount: 338903,
    director: 'Bryan Singer',
    starring: [
      'Rami Malek',
      'Lucy Boynton',
      'Gwilym Lee'
    ],
    runTime: 134,
    genre: 'Drama',
    released: 2018,
    isFavorite: false
  },
  {
    id: '865ce6c5-b940-4a9a-9335-6d975f39dbaf',
    name: 'Macbeth',
    posterImage: 'https://13.design.htmlacademy.pro/static/film/poster/Macbeth.jpg',
    backgroundImage: 'https://13.design.htmlacademy.pro/static/film/background/Macbeth.jpg',
    backgroundColor: '#F1E9CE',
    videoLink: 'https://13.design.htmlacademy.pro/static/film/video/matrix.mp4',
    description: 'Macbeth, the Thane of Glamis, receives a prophecy from a trio of witches that one day he will become King of Scotland. Consumed by ambition and spurred to action by his wife, Macbeth murders his king and takes the throne for himself.',
    rating: 3.3,
    scoresCount: 48798,
    director: 'Justin Kurzel',
    starring: [
      'Michael Fassbender',
      'Marion Cotillard',
      'Jack Madigan'
    ],
    runTime: 113,
    genre: 'Drama',
    released: 2015,
    isFavorite: false
  },
  {
    id: '83a23762-5e3b-4a8d-98dd-b34a721cfe71',
    name: 'Aviator',
    posterImage: 'https://13.design.htmlacademy.pro/static/film/poster/Aviator.jpg',
    backgroundImage: 'https://13.design.htmlacademy.pro/static/film/background/Aviator.jpg',
    backgroundColor: '#D6CDAF',
    videoLink: 'https://13.design.htmlacademy.pro/static/film/video/bike.mp4',
    description: 'A biopic depicting the early years of legendary Director and aviator Howard Hughes\' career from the late 1920s to the mid 1940s.',
    rating: 9.8,
    scoresCount: 307174,
    director: 'Martin Scorsese',
    starring: [
      'Leonardo DiCaprio',
      'Cate Blanchett',
      'Kate Beckinsale'
    ],
    runTime: 170,
    genre: 'Drama',
    released: 2014,
    isFavorite: false
  },
  {
    id: '48e8eaa3-59fd-423c-ac62-9dfe07452936',
    name: 'We need to talk about Kevin',
    posterImage: 'https://13.design.htmlacademy.pro/static/film/poster/We_need_to_talk_about_Kevin.jpg',
    backgroundImage: 'https://13.design.htmlacademy.pro/static/film/background/We_need_to_talk_about_Kevin.jpg',
    backgroundColor: '#E1DFDE',
    videoLink: 'https://13.design.htmlacademy.pro/static/film/video/matrix.mp4',
    description: 'Kevin\'s mother struggles to love her strange child, despite the increasingly dangerous things he says and does as he grows up. But Kevin is just getting started, and his final act will be beyond anything anyone imagined.',
    rating: 3.8,
    scoresCount: 123240,
    director: 'Lynne Ramsay',
    starring: [
      'Tilda Swinton',
      'John C. Reilly',
      'Ezra Miller'
    ],
    runTime: 112,
    genre: 'Drama',
    released: 2011,
    isFavorite: false
  },
  {
    id: '6236cb0b-d74c-49cc-9456-958894f1a7e1',
    name: 'What We Do in the Shadows',
    posterImage: 'https://13.design.htmlacademy.pro/static/film/poster/What-We-Do-in-the-Shadows.jpg',
    backgroundImage: 'https://13.design.htmlacademy.pro/static/film/background/What-We-Do-in-the-Shadows.jpg',
    backgroundColor: '#A39E81',
    videoLink: 'https://13.design.htmlacademy.pro/static/film/video/bubbles.mp4',
    description: 'A look into the daily (or rather, nightly) lives of three vampires who\'ve lived together for over 100 years, in Staten Island.',
    rating: 7.2,
    scoresCount: 6173,
    director: 'Jemaine Clement',
    starring: [
      'Kayvan Novak',
      'Matt Berry',
      'Natasia Demetriou'
    ],
    runTime: 30,
    genre: 'Comedy',
    released: 2019,
    isFavorite: false
  },
  {
    id: '75a7327e-35ff-47f5-b698-3aa2db165326',
    name: 'The Revenant',
    posterImage: 'https://13.design.htmlacademy.pro/static/film/poster/Revenant.jpg',
    backgroundImage: 'https://13.design.htmlacademy.pro/static/film/background/Revenant.jpg',
    backgroundColor: '#92918B',
    videoLink: 'https://13.design.htmlacademy.pro/static/film/video/bike.mp4',
    description: 'A frontiersman on a fur trading expedition in the 1820s fights for survival after being mauled by a bear and left for dead by members of his own hunting team.',
    rating: 4,
    scoresCount: 618498,
    director: 'Alejandro G. Iñárritu',
    starring: [
      'Leonardo DiCaprio',
      'Tom Hardy',
      'Will Poulter'
    ],
    runTime: 156,
    genre: 'Action',
    released: 2015,
    isFavorite: false
  },
  {
    id: '388dfbf6-eeec-4acf-ad6d-3c92781398d6',
    name: 'Johnny English',
    posterImage: 'https://13.design.htmlacademy.pro/static/film/poster/Johnny_English.jpg',
    backgroundImage: 'https://13.design.htmlacademy.pro/static/film/background/Johnny_English.jpg',
    backgroundColor: '#F0DBA2',
    videoLink: 'https://13.design.htmlacademy.pro/static/film/video/matrix.mp4',
    description: 'After a sudden attack on the MI5, Johnny English, Britain\'s most confident yet unintelligent spy, becomes Britain\'s only spy.',
    rating: 10,
    scoresCount: 136843,
    director: 'Peter Howitt',
    starring: [
      'Rowan Atkinson',
      'John Malkovich',
      'Natalie Imbruglia'
    ],
    runTime: 88,
    genre: 'Comedy',
    released: 2003,
    isFavorite: false
  }
];
