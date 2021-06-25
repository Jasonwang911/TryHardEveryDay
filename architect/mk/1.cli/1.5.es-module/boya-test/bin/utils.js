import pathExists from 'path-exists'

export function exitPath(p) {
  return pathExists.sync(p)
}

