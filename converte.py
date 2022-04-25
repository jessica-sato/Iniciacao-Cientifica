from binascii import hexlify

#se python1 ou 2:
#string_ascii = input("Coloque o hash em ascii:")
#se python3.x:

while(True):
	string_unicode = input("Coloque o hash:")
	string_ascii = string_unicode.encode('ascii')
	string_hex = hexlify(string_ascii)
	print(string_hex.decode())
