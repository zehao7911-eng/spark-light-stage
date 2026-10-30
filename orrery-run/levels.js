(function(root){const defs=[
  {
    "name": "The First Orbit",
    "rows": [
      "#######",
      "#.....#",
      "#####.#",
      "#.....#",
      "#.#####",
      "#.....#",
      "#######"
    ],
    "start": [
      1,
      1
    ],
    "gems": [
      [
        5,
        1
      ],
      [
        1,
        3
      ],
      [
        1,
        5
      ]
    ],
    "exit": [
      5,
      5
    ],
    "par": 5
  },
  {
    "name": "Amber Switchback",
    "seed": 8004,
    "size": 7,
    "start": [
      1,
      1
    ],
    "gems": [
      [
        1,
        3
      ],
      [
        3,
        3
      ],
      [
        1,
        5
      ]
    ],
    "exit": [
      5,
      5
    ],
    "par": 9
  },
  {
    "name": "The Copper Loop",
    "seed": 15000,
    "size": 7,
    "start": [
      1,
      1
    ],
    "gems": [
      [
        1,
        3
      ],
      [
        1,
        5
      ],
      [
        5,
        5
      ]
    ],
    "exit": [
      5,
      1
    ],
    "par": 8,
    "openings": [
      [
        4,
        1
      ]
    ]
  },
  {
    "name": "Sunwheel Circuit",
    "seed": 22000,
    "size": 7,
    "start": [
      1,
      1
    ],
    "gems": [
      [
        5,
        1
      ],
      [
        3,
        3
      ],
      [
        3,
        5
      ]
    ],
    "exit": [
      3,
      1
    ],
    "par": 8,
    "openings": [
      [
        3,
        4
      ],
      [
        2,
        1
      ]
    ]
  },
  {
    "name": "A Key to the Engine",
    "seed": 29005,
    "size": 7,
    "start": [
      1,
      1
    ],
    "gems": [
      [
        1,
        3
      ],
      [
        5,
        5
      ],
      [
        5,
        3
      ]
    ],
    "exit": [
      1,
      5
    ],
    "par": 7,
    "openings": [
      [
        2,
        4
      ],
      [
        4,
        2
      ],
      [
        2,
        2
      ]
    ],
    "key": [
      5,
      1
    ],
    "gate": [
      2,
      3
    ]
  },
  {
    "name": "Brass Locksmith",
    "seed": 36031,
    "size": 7,
    "start": [
      1,
      1
    ],
    "gems": [
      [
        5,
        5
      ],
      [
        1,
        3
      ],
      [
        3,
        1
      ]
    ],
    "exit": [
      1,
      5
    ],
    "par": 10,
    "openings": [
      [
        3,
        2
      ]
    ],
    "key": [
      5,
      1
    ],
    "gate": [
      2,
      5
    ]
  },
  {
    "name": "The Split Turbine",
    "seed": 43007,
    "size": 7,
    "start": [
      1,
      1
    ],
    "gems": [
      [
        1,
        5
      ],
      [
        3,
        1
      ],
      [
        5,
        5
      ]
    ],
    "exit": [
      5,
      3
    ],
    "par": 12,
    "openings": [
      [
        4,
        4
      ],
      [
        4,
        2
      ]
    ],
    "key": [
      3,
      3
    ],
    "gate": [
      4,
      3
    ]
  },
  {
    "name": "The Gilded Relay",
    "seed": 50382,
    "size": 7,
    "start": [
      1,
      1
    ],
    "gems": [
      [
        1,
        5
      ],
      [
        1,
        3
      ],
      [
        3,
        1
      ]
    ],
    "exit": [
      5,
      1
    ],
    "par": 11,
    "openings": [
      [
        2,
        4
      ],
      [
        4,
        2
      ],
      [
        2,
        2
      ]
    ],
    "key": [
      3,
      3
    ],
    "gate": [
      5,
      4
    ]
  },
  {
    "name": "A Fold in Space",
    "seed": 57011,
    "size": 7,
    "start": [
      1,
      1
    ],
    "gems": [
      [
        5,
        3
      ],
      [
        1,
        3
      ],
      [
        3,
        1
      ]
    ],
    "exit": [
      5,
      5
    ],
    "par": 9,
    "openings": [
      [
        3,
        2
      ]
    ],
    "key": [
      5,
      1
    ],
    "gate": [
      1,
      4
    ],
    "portals": [
      [
        2,
        1
      ],
      [
        3,
        3
      ]
    ]
  },
  {
    "name": "Twin Moon Conduit",
    "seed": 64018,
    "size": 7,
    "start": [
      1,
      1
    ],
    "gems": [
      [
        5,
        2
      ],
      [
        5,
        5
      ],
      [
        1,
        3
      ]
    ],
    "exit": [
      1,
      5
    ],
    "par": 12,
    "openings": [
      [
        4,
        1
      ],
      [
        4,
        2
      ]
    ],
    "key": [
      5,
      1
    ],
    "gate": [
      4,
      5
    ],
    "portals": [
      [
        3,
        2
      ],
      [
        5,
        3
      ]
    ]
  },
  {
    "name": "The Orbital Exchange",
    "seed": 71188,
    "size": 7,
    "start": [
      1,
      1
    ],
    "gems": [
      [
        1,
        3
      ],
      [
        3,
        1
      ],
      [
        5,
        1
      ]
    ],
    "exit": [
      1,
      5
    ],
    "par": 13,
    "openings": [
      [
        2,
        4
      ],
      [
        4,
        3
      ],
      [
        2,
        2
      ]
    ],
    "key": [
      3,
      5
    ],
    "gate": [
      2,
      5
    ],
    "portals": [
      [
        1,
        2
      ],
      [
        4,
        5
      ]
    ]
  },
  {
    "name": "The Final Alignment",
    "seed": 78001,
    "size": 9,
    "start": [
      1,
      1
    ],
    "gems": [
      [
        5,
        5
      ],
      [
        1,
        7
      ],
      [
        3,
        7
      ]
    ],
    "exit": [
      3,
      3
    ],
    "par": 15,
    "openings": [
      [
        2,
        4
      ]
    ],
    "key": [
      5,
      1
    ],
    "gate": [
      6,
      5
    ],
    "portals": [
      [
        7,
        7
      ],
      [
        5,
        3
      ]
    ]
  }
];root.OrbDefs=defs;if(typeof module!=="undefined"&&module.exports)module.exports=defs;})(typeof window!=="undefined"?window:globalThis);
