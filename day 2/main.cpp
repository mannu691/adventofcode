#include <bits\stdc++.h>
#include "../utils/cpp/utils.cpp"

using namespace std;

bool isSafe(vector<int> &report, bool damped = false, bool rec = true)
{
    int mul = report[0] <= report[1] ? 1 : -1;
    int prev = report[0];
    for (int i = 1; i < report.size(); ++i)
    {
        int diff = (report[i] - prev) * mul;
        if (diff < 1 || diff > 3)
        {
            if (damped)
            {
                if (rec)
                {
                    vector<int> temp = report;
                    report.erase(report.begin());
                    temp.erase(temp.begin() + 1);
                    //IK Shitty way to do this , but if it works dont touch it :)
                    return isSafe(report, true, false) || isSafe(temp, true, false);
                }
                return false;
            }
            else
            {
                damped = true;
            }
        }
        else
        {
            prev = report[i];
        }
    }
    return true;
}
int main()
{
    bind_input("2",false);
    vector<int> report;
    int curr;
    int count = 0;
    while (cin >> curr)
    {
        report.push_back(curr);
        if (cin.peek() == '\n' || cin.eof())
        {
            if (isSafe(report))
            {
                count++;
            }
            report.clear();
        }
    }
    cout << count;
    return 0;
}