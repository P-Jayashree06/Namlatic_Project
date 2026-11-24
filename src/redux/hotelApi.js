const STORAGE_KEY = 'hotel-management-records';

const initialHotels = [
  {
    id: 'hotel-1',
    title: 'The Grand Azure',
    description:
      'A refined city retreat with sunlit rooms, thoughtful service, and an easy walk to the waterfront promenade.',
    latitude: 25.2048,
    longitude: 55.2708,
    price: 245,
    image:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'hotel-2',
    title: 'Palm Garden Resort',
    description:
      'Unwind among tropical gardens and calm pools at this welcoming resort, made for slow mornings and relaxed evenings.',
    latitude: 25.1124,
    longitude: 55.139,
    price: 189,
    image:
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'hotel-3',
    title: 'Harbor House',
    description:
      'A contemporary hideaway with generous suites and sweeping marina views, just steps from local cafes and shops.',
    latitude: 25.0805,
    longitude: 55.1373,
    price: 315,
    image:
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'hotel-4',
    title: 'Cedar & Stone Inn',
    description:
      'Warm natural textures, personal touches, and peaceful rooms make this boutique stay a favorite for weekend escapes.',
    latitude: 25.1972,
    longitude: 55.2744,
    price: 142,
    image:
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'hotel-5',
    title: 'The Meridian Suites',
    description:
      'Spacious, fully appointed suites in a central location, with a bright lounge and room to settle in for longer stays.',
    latitude: 25.2196,
    longitude: 55.2815,
    price: 275,
    image:
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'hotel-6',
    title: 'Dune View Lodge',
    description:
      'A quiet base for exploring the coast, pairing clean-lined comfort with open views and an inviting outdoor terrace.',
    latitude: 24.9889,
    longitude: 55.0456,
    price: 165,
    image:
      'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'hotel-7',
    title: 'Maison Olive',
    description:
      'An intimate boutique hotel with carefully considered interiors, a calm courtyard, and neighborhood dining nearby.',
    latitude: 25.2341,
    longitude: 55.3026,
    price: 220,
    image:
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'hotel-8',
    title: 'Seabreeze Hotel',
    description:
      'Wake up close to the water in comfortable rooms with plenty of natural light and easy access to the beach.',
    latitude: 25.0906,
    longitude: 55.1462,
    price: 198,
    image:
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=85',
  },
];

function readHotels() {
  try {
    const savedHotels = window.localStorage.getItem(STORAGE_KEY);
    if (savedHotels === null) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialHotels));
      return initialHotels;
    }

    const parsedHotels = JSON.parse(savedHotels);
    if (!Array.isArray(parsedHotels)) {
      throw new Error('Saved hotel records are not a list.');
    }
    return parsedHotels;
  } catch (error) {
    console.error('Unable to load saved hotels:', error);
    return initialHotels;
  }
}

function persistHotels(hotels) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(hotels));
}

function simulateRequest(operation) {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      try {
        resolve(operation());
      } catch (error) {
        reject(error);
      }
    }, 180);
  });
}

export const hotelApi = {
  list() {
    return simulateRequest(readHotels);
  },

  save(hotel) {
    return simulateRequest(() => {
      const hotels = readHotels();
      const existingIndex = hotels.findIndex((item) => item.id === hotel.id);
      const updatedHotels =
        existingIndex === -1
          ? [hotel, ...hotels]
          : hotels.map((item) => (item.id === hotel.id ? hotel : item));
      persistHotels(updatedHotels);
      return updatedHotels;
    });
  },

  remove(id) {
    return simulateRequest(() => {
      const updatedHotels = readHotels().filter((hotel) => hotel.id !== id);
      persistHotels(updatedHotels);
      return updatedHotels;
    });
  },
};
