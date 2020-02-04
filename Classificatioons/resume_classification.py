from flask import Flask
import json
import last_try
import os
from flask import Flask
from flask_behind_proxy import FlaskBehindProxy


app = Flask(__name__)


@app.route("/app")
def get_profile_class():
    # check the ile path to the extract or predict output from the data
    paths = 'C:/Users/Vedang Parasnis/Desktop/Hackathon/Classificatioons/user.txt'
    check = os.path.isfile(paths)
    if(not(check)):
        return({
            "category": "no source file there"
        })
    else:
        file = open(paths, mode='r', encoding="utf8")
        all_of_it = file.read()
        file.close()

        ans = last_try.get_pred(all_of_it)
        print(ans)

        d = {'category': ans}

        with open('user_category.json', 'w') as outfile:
            json.dump(d, outfile)

        return(d)


if __name__ == '__main__':
    app.run(debug=True)
    proxied = FlaskBehindProxy(app)
