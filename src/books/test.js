drama.chara({
  "A-san": ["Actor", 1],
  "B-san": ["Actor", 2],
  "C-san": ["Actor", 3],
})

drama.write("test", [
  [
    `> A-san
    odkoqkdokodqwkokdw
    odkoqkdokodqwkokdw
    odkoqkdokodqwkokdw
    odkoqkdokodqwkokdw`,
    `> B-san
    odkoqkdokodqwkokdw
    odkoqkdokodqwkokdw`,
    `> C-san
    odkoqkdokodqwkokdw
    odkoqkdokodqwkokdw
    
    odkoqkdokodqwkokdw`,
    `> 
    odkoq\\c[6]kdokodqwkokdw
    odkoqkdokodqwkokdw
    odkoqkdokodqwkokdw
    odkoqkdok\\c[0]odqwkokdw`
  ]
])

// drama.read("test", 0);
