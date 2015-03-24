"""
This file is part of 'Track Me Not',
Copyright(C) 2015 - Today Aman Kumar Jain

'Track Me Not' is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License version 3 as
published by the Free Software Foundation.

'Track Me Not' is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with 'Track Me Not'.  If not, see <http://www.gnu.org/licenses/>.
"""
import zipfile


def archive(files, path_to_archive, root):
    arc = zipfile.ZipFile(path_to_archive, 'w', zipfile.ZIP_DEFLATED)
    for f in files:
        arc.write(f, "/%s" % f)
    arc.close()

archive(["manifest.json", "content.js", "background.js",
         "assets/logo-128x128.png"], "extension.zip", "/")
