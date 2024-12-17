from collections import defaultdict
from heapq import heappop, heappush

grid = {i + j * 1j: c for i, r in enumerate(open('input.txt'))
        for j, c in enumerate(r.strip()) if c != '#'}

start, = (p for p in grid if grid[p] in 'S')

seen = []
best = 1e9
dist = defaultdict(lambda: 1e9)
todo = [(0, t := 0, start, 1j, [start])]
final_path = []  # To store the final path

while todo:
    score, _, pos, dir, path = heappop(todo)

    if score > dist[pos, dir]:
        continue
    else:
        dist[pos, dir] = score

    if grid[pos] == 'E' and score <= best:
        seen += path
        best = score
        final_path = path  # Store the path leading to the goal

    for rot, pts in (1, 1), (1j, 1001), (-1j, 1001):
        new = pos + dir * rot
        if new in grid:
            heappush(todo, (score + pts, t := t + 1,
                            new, dir * rot, path + [new]))

print("Best score:", best)
print("Unique nodes visited:", len(set(seen)))
print("Final path:", final_path)
