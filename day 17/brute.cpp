#include <iostream>
#include <cmath>
using namespace std;

int main()
{
    long long max = 10000000000;
    for (long long a = 0; a < max; a++)
    {
        if (((((((a % 8) ^ 1) ^ 5) ^ (long long)(a / pow(2, ((a % 8) ^ 1)))) % 8) == 2) &&
            (((((((long long)(a / pow(2, 3)) % 8) ^ 1) ^ 5) ^ (long long)((a / pow(2, 3)) / pow(2, (((long long)(a / pow(2, 3)) % 8) ^ 1)))) % 8) == 4) &&
            (((((((long long)((a / pow(2, 3)) / pow(2, 3)) % 8) ^ 1) ^ 5) ^ (long long)(((a / pow(2, 3)) / pow(2, 3)) / pow(2, (((long long)((a / pow(2, 3)) / pow(2, 3)) % 8) ^ 1)))) % 8) == 1) &&
            (((((((long long)(((a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) % 8) ^ 1) ^ 5) ^ (long long)((((a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, (((long long)(((a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) % 8) ^ 1)))) % 8) == 1) &&
            (((((((long long)((((a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) % 8) ^ 1) ^ 5) ^ (long long)(((((a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, (((long long)((((a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) % 8) ^ 1)))) % 8) == 7) &&
            (((((((long long)(((((a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) % 8) ^ 1) ^ 5) ^ (long long)((((((a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, (((long long)(((((a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) % 8) ^ 1)))) % 8) == 5) &&
            (((((((long long)((((((a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) % 8) ^ 1) ^ 5) ^ (long long)(((((((a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, (((long long)((((((a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) % 8) ^ 1)))) % 8) == 1) &&
            (((((((long long)(((((((a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) % 8) ^ 1) ^ 5) ^ (long long)((((((((a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, (((long long)(((((((a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) % 8) ^ 1)))) % 8) == 5) &&
            (((((((long long)((((((((a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) % 8) ^ 1) ^ 5) ^ (long long)(((((((((a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, (((long long)((((((((a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) % 8) ^ 1)))) % 8) == 4) &&
            (((((((long long)(((((((((a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) % 8) ^ 1) ^ 5) ^ (long long)((((((((((a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, (((long long)(((((((((a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) % 8) ^ 1)))) % 8) == 3) &&
            (((((((long long)((((((((((a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) % 8) ^ 1) ^ 5) ^ (long long)(((((((((((a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, (((long long)((((((((((a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) % 8) ^ 1)))) % 8) == 0) &&
            (((((((long long)(((((((((((a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) % 8) ^ 1) ^ 5) ^ (long long)((((((((((((a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, (((long long)(((((((((((a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) % 8) ^ 1)))) % 8) == 3) &&
            (((((((long long)((((((((((((a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) % 8) ^ 1) ^ 5) ^ (long long)(((((((((((((a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, (((long long)((((((((((((a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) % 8) ^ 1)))) % 8) == 5) &&
            (((((((long long)(((((((((((((a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) % 8) ^ 1) ^ 5) ^ (long long)((((((((((((((a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, (((long long)(((((((((((((a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) % 8) ^ 1)))) % 8) == 5) &&
            (((((((long long)((((((((((((((a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) % 8) ^ 1) ^ 5) ^ (long long)(((((((((((((((a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, (((long long)((((((((((((((a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) % 8) ^ 1)))) % 8) == 3) &&
            (((((((long long)(((((((((((((((a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) % 8) ^ 1) ^ 5) ^ (long long)((((((((((((((((a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, (((long long)(((((((((((((((a / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) / pow(2, 3)) % 8) ^ 1)))) % 8) == 0))
        {
            cout << "winner :" << a;
            break;
        }
    }

    return 0;
}