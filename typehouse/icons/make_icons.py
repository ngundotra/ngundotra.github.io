#!/usr/bin/env python3
import struct, zlib, os

INK = (0x1A, 0x12, 0x10, 255)
TIMBER = (0x3D, 0x2A, 0x24, 255)
COPPER = (0x8B, 0x5A, 0x3C, 255)
PARCH = (0xC4, 0xA5, 0x74, 255)
LAMP = (0xE8, 0xD5, 0xB0, 255)
EMBER = (0xC4, 0x5C, 0x26, 255)
DUSK = (0x4A, 0x6B, 0x8A, 255)

# 16x16 pixel inn sign
PIX = [
    "0000000000000000",
    "0000011111000000",
    "0001112222111000",
    "0111222222221110",
    "1112223333222111",
    "1122233333322211",
    "1112223333222111",
    "0111666666661110",
    "0016445555446100",
    "0016447777446100",
    "0016445555446100",
    "0016666336666100",
    "0016666336666100",
    "0016666666666100",
    "0001111111111000",
    "0000000000000000",
]
COL = {
    "0": INK,
    "1": COPPER,
    "2": EMBER,
    "3": TIMBER,
    "4": LAMP,
    "5": DUSK,
    "6": TIMBER,
    "7": PARCH,
}


def write_png(path, w, h, rgba_rows):
    raw = b"".join(b"\x00" + row for row in rgba_rows)
    def chunk(tag, data):
        return struct.pack(">I", len(data)) + tag + data + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)
    ihdr = struct.pack(">IIBBBBB", w, h, 8, 6, 0, 0, 0)
    png = b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", ihdr) + chunk(b"IDAT", zlib.compress(raw, 9)) + chunk(b"IEND", b"")
    with open(path, "wb") as f:
        f.write(png)


def scale(size):
    rows = []
    s = size // 16
    for y in range(size):
        row = bytearray()
        srcy = min(15, y // s)
        for x in range(size):
            srcx = min(15, x // s)
            row.extend(COL[PIX[srcy][srcx]])
        rows.append(bytes(row))
    return rows


here = os.path.dirname(os.path.abspath(__file__))
write_png(os.path.join(here, "icon-192.png"), 192, 192, scale(192))
write_png(os.path.join(here, "icon-512.png"), 512, 512, scale(512))
write_png(os.path.join(here, "apple-touch-icon.png"), 180, 180, scale(180))
print("wrote icons")
