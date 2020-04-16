import * as img from '../../assets/cards-img/';
import * as audio from '../../assets/cards-audio';

export const cards = {
  categories: [
    {
      name: 'Action (set A)',
      src: img.dance,
      url: '/action-a'
    },
    {
      name: 'Action (set B)',
      src: img.swim,
      url: '/action-b'
    },
    {
      name: 'Action (set C)',
      src: img.drop,
      url: '/action-c'
    },
    {
      name: 'Adjective',
      src: img.friendly,
      url: '/adjective'
    },
    {
      name: 'Animal (set A)',
      src: img.cat,
      url: '/animal-a'
    },
    {
      name: 'Animal (set B)',
      src: img.bird,
      url: '/animal-b'
    },
    {
      name: 'Clothes',
      src: img.blouse,
      url: '/clothes'
    },
    {
      name: 'Emotion',
      src: img.smile,
      url: '/emotion'
    },
  ],
  'action-a': [
    {
      word: 'cry',
      translation: 'плакать',
      image: img.cry,
      audioSrc: audio.cry
    },
    {
      word: 'dance',
      translation: 'танцевать',
      image: img.dance,
      audioSrc: audio.dance
    },
    {
      word: 'dive',
      translation: 'нырять',
      image: img.dive,
      audioSrc: audio.dive
    },
    {
      word: 'draw',
      translation: 'рисовать',
      image: img.draw,
      audioSrc: audio.draw
    },
    {
      word: 'fish',
      translation: 'ловить рыбу',
      image: img.fish,
      audioSrc: audio.fish
    },
    {
      word: 'fly',
      translation: 'летать',
      image: img.fly,
      audioSrc: audio.fly
    },
    {
      word: 'hug',
      translation: 'обнимать',
      image: img.hug,
      audioSrc: audio.hug
    },
    {
      word: 'jump',
      translation: 'прыгать',
      image: img.jump,
      audioSrc: audio.jump
    }
  ],
  'action-b': [
    {
      word: 'open',
      translation: 'открывать',
      image: img.open,
      audioSrc: audio.open1
    },
    {
      word: 'play',
      translation: 'играть',
      image: img.play,
      audioSrc: audio.play
    },
    {
      word: 'point',
      translation: 'указывать',
      image: img.point,
      audioSrc: audio.point
    },
    {
      word: 'ride',
      translation: 'ездить',
      image: img.ride,
      audioSrc: audio.ride
    },
    {
      word: 'run',
      translation: 'бегать',
      image: img.run,
      audioSrc: audio.run
    },
    {
      word: 'sing',
      translation: 'петь',
      image: img.sing,
      audioSrc: audio.sing
    },
    {
      word: 'skip',
      translation: 'прыгать',
      image: img.skip,
      audioSrc: audio.skip
    },
    {
      word: 'swim',
      translation: 'плавать',
      image: img.swim,
      audioSrc: audio.swim
    }
  ],
  'action-c':   [
    {
      word: 'argue',
      translation: 'спорить',
      image: img.argue,
      audioSrc: audio.argue
    },
    {
      word: 'build',
      translation: 'строить',
      image: img.build,
      audioSrc: audio.build
    },
    {
      word: 'carry',
      translation: 'нести',
      image: img.carry,
      audioSrc: audio.carry
    },
    {
      word: 'catch',
      translation: 'ловить',
      image: img.catch1,
      audioSrc: audio.catch1
    },
    {
      word: 'drive',
      translation: 'водить машину',
      image: img.drive,
      audioSrc: audio.drive
    },
    {
      word: 'drop',
      translation: 'падать',
      image: img.drop,
      audioSrc: audio.drop
    },
    {
      word: 'pull',
      translation: 'тянуть',
      image: img.pull,
      audioSrc: audio.pull
    },
    {
      word: 'push',
      translation: 'толкать',
      image: img.push,
      audioSrc: audio.push
    }
  ],
  'adjective': [
    {
      word: 'big',
      translation: 'большой',
      image: img.big,
      audioSrc: audio.big
    },
    {
      word: 'small',
      translation: 'маленький',
      image: img.small,
      audioSrc: audio.small
    },
    {
      word: 'fast',
      translation: 'быстрый',
      image: img.fast,
      audioSrc: audio.fast
    },
    {
      word: 'slow',
      translation: 'медленный',
      image: img.slow,
      audioSrc: audio.slow
    },
    {
      word: 'friendly',
      translation: 'дружелюбный',
      image: img.friendly,
      audioSrc: audio.friendly
    },
    {
      word: 'unfriendly',
      translation: 'недружелюбный',
      image: img.unfriendly,
      audioSrc: audio.unfriendly
    },
    {
      word: 'young',
      translation: 'молодой',
      image: img.young,
      audioSrc: audio.young
    },
    {
      word: 'old',
      translation: 'старый',
      image: img.old,
      audioSrc: audio.old
    }
  ],
  'animal-a': [
    {
      word: 'cat',
      translation: 'кот',
      image: img.cat,
      audioSrc: audio.cat
    },
    {
      word: 'chick',
      translation: 'цыплёнок',
      image: img.chick,
      audioSrc: audio.chick
    },
    {
      word: 'chicken',
      translation: 'курица',
      image: img.chicken,
      audioSrc: audio.chicken
    },
    {
      word: 'dog',
      translation: 'собака',
      image: img.dog,
      audioSrc: audio.dog
    },
    {
      word: 'horse',
      translation: 'лошадь',
      image: img.horse,
      audioSrc: audio.horse
    },
    {
      word: 'pig',
      translation: 'свинья',
      image: img.pig,
      audioSrc: audio.pig
    },
    {
      word: 'rabbit',
      translation: 'кролик',
      image: img.rabbit,
      audioSrc: audio.rabbit
    },
    {
      word: 'sheep',
      translation: 'овца',
      image: img.sheep,
      audioSrc: audio.sheep
    }
  ],
  'animal-b': [
    {
      word: 'bird',
      translation: 'птица',
      image: img.bird,
      audioSrc: audio.bird
    },
    {
      word: 'fish',
      translation: 'рыба',
      image: img.fish1,
      audioSrc: audio.fish
    },
    {
      word: 'frog',
      translation: 'жаба',
      image: img.frog,
      audioSrc: audio.frog
    },
    {
      word: 'giraffe',
      translation: 'жирафа',
      image: img.giraffe,
      audioSrc: audio.giraffe
    },
    {
      word: 'lion',
      translation: 'лев',
      image: img.lion,
      audioSrc: audio.lion
    },
    {
      word: 'mouse',
      translation: 'мышь',
      image: img.mouse,
      audioSrc: audio.mouse
    },
    {
      word: 'turtle',
      translation: 'черепаха',
      image: img.turtle,
      audioSrc: audio.turtle
    },
    {
      word: 'dolphin',
      translation: 'дельфин',
      image: img.dolphin,
      audioSrc: audio.dolphin
    }
  ],
  'clothes': [
    {
      word: 'skirt',
      translation: 'юбка',
      image: img.skirt,
      audioSrc: audio.skirt
    },
    {
      word: 'pants',
      translation: 'брюки',
      image: img.pants,
      audioSrc: audio.pants
    },
    {
      word: 'blouse',
      translation: 'блузка',
      image: img.blouse,
      audioSrc: audio.blouse
    },
    {
      word: 'dress',
      translation: 'платье',
      image: img.dress,
      audioSrc: audio.dress
    },
    {
      word: 'boot',
      translation: 'ботинок',
      image: img.boot,
      audioSrc: audio.boot
    },
    {
      word: 'shirt',
      translation: 'рубашка',
      image: img.shirt,
      audioSrc: audio.shirt
    },
    {
      word: 'coat',
      translation: 'пальто',
      image: img.coat,
      audioSrc: audio.coat
    },
    {
      word: 'shoe',
      translation: 'туфли',
      image: img.shoe,
      audioSrc: audio.shoe
    }
  ],
  'emotion': [
    {
      word: 'sad',
      translation: 'грустный',
      image: img.sad,
      audioSrc: audio.sad
    },
    {
      word: 'angry',
      translation: 'сердитый',
      image: img.angry,
      audioSrc: audio.angry
    },
    {
      word: 'happy',
      translation: 'счастливый',
      image: img.happy,
      audioSrc: audio.happy
    },
    {
      word: 'tired',
      translation: 'уставший',
      image: img.tired,
      audioSrc: audio.tired
    },
    {
      word: 'surprised',
      translation: 'удивлённый',
      image: img.surprised,
      audioSrc: audio.surprised
    },
    {
      word: 'scared',
      translation: 'испуганный',
      image: img.scared,
      audioSrc: audio.scared
    },
    {
      word: 'smile',
      translation: 'улыбка',
      image: img.smile,
      audioSrc: audio.smile
    },
    {
      word: 'laugh',
      translation: 'смех',
      image: img.laugh,
      audioSrc: audio.laugh
    }
  ]
};
