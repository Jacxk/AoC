file = *File.open("input.txt").map(&:strip).map(&:chars)

part1 = -> {
  least, most = "", ""

  file[0].size.times { |x|
    one, ceros = 0, 0

    file.each { |y| y[x] == "1" ? one += 1 : ceros += 1 }

    list = [one, ceros]

    most += list.index(list.max).to_s
    least += list.index(list.min).to_s
  }
  return least.to_i(2) * most.to_i(2)
}

part2 = -> {
  max = -> {
    input = file
    input[0].size.times { |x|
      one, ceros = 0, 0

      input.each { |y| y[x] == "1" ? one += 1 : ceros += 1 }

      list = [ceros, one]
      input = input.select { |y|
        if one == ceros
          y[x] == "1"
        else
          y[x].to_i == list.index(list.max)
        end
      }
    }
    input[0].join.to_i(2)
  }

  min = -> {
    input = file
    input[0].size.times { |x|
      one, ceros = 0, 0

      input.each { |y| y[x] == "1" ? one += 1 : ceros += 1 }

      list = [ceros, one]
      input = input.select { |y|
        if one == ceros
          y[x] == "0"
        else
          y[x].to_i == list.index(list.min)
        end
      }

      if input.size < 2
        return input[0].join.to_i(2)
      end
    }
  }
  return max.call * min.call
}

puts "Part one: #{part1.call}"
puts "Part two: #{part2.call}"
