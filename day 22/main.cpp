#include <iostream>
#include <cmath>
#include <limits>
#include <map>
#include <vector>
#include <string>
#include <set>
using namespace std;

int nextSecret(long long sec)
{
    sec = (sec ^ (sec * 64)) % 16777216;
    sec = (sec ^ (long long)floor(sec / 32.0)) % 16777216;
    sec = (sec ^ (sec * 2048)) % 16777216;
    return sec;
}
int main()
{
    freopen("input.txt", "r", stdin);
    int times = 2000;
    long long secret;
    map<string, int> sequences;
    long long sum = 0;
    while (cin >> secret)
    {
        set<string> done;
        vector<int> seq;
        int prevDigit = secret % 10;
        string key;
        for (int i = 0; i < times; i++)
        {

            secret = nextSecret(secret);
            int digit = secret % 10;
            seq.push_back(digit - prevDigit);
            prevDigit = digit;

            if (seq.size() == 4)
            {
                key = to_string(seq[0]) + "," + to_string(seq[1]) + "," + to_string(seq[2]) + "," + to_string(seq[3]);
                if (done.find(key) == done.end())
                {
                    sequences[key] = sequences[key] + digit;
                    done.insert(key);
                }
                seq.erase(seq.begin());
            }
        }
        sum += secret;
    }
    int high = 0;
    for (const auto &entry : sequences)
    {
        high = max(high, entry.second);
    }
    cout << "Part 1 : " << sum << endl;
    cout << "Part 2 : " << high << endl;
}
