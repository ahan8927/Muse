def getWays(n, c):
    # Write your code here
    ways = 0
    print(f'ways: {ways}')
    for i in range(len(c)):
        if c[i] > n:
            continue

        elif n % c[i] == 0:
            ways += 1
            print(f'{n} / {c[i]} == {n / c[i]}: ways + 1: {ways}')

        for j in range(len(c)):
            if c[j] == c[i]:
                continue

            x = 1
            while (c[i] + (x * c[j])) <= n:
                if n % (c[i] + (x * c[j])) == 0:
                    ways += 1
                    print(
                        f'{n} % {c[i]} + ({x} * {c[j]}) = { n % (c[i] + (x * c[j]))} : ways + 1: {ways}')
                x += 1
    return ways


print(getWays(4, [1, 2, 3]))
