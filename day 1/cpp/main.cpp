#include <bits\stdc++.h>
#include "../../utils/cpp/utils.cpp"
using namespace std;

int main()
{
    bind_input("1", false);
    vector<int> left;
    vector<int> right;
    int a, b;
    while (cin >> a >> b)
    {
        left.push_back(a);
        right.push_back(b);
    }
    sort(left.begin(), left.end());
    sort(right.begin(), right.end());
    int diffSum = 0;
    int countSum = 0;
    for (int i = 0; i < left.size(); i++)
    {
        diffSum += abs(left[i] - right[i]);
        countSum += left[i] * count(right.begin(), right.end(), left[i]);
    }
    cout << "Part 1 : " << diffSum << endl;
    cout << "Part 2 : " << countSum << endl;

    return 0;
}
