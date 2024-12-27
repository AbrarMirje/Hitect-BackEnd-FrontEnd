package com.maven.pos.services.impl;

import com.maven.pos.entities.Topping;
import com.maven.pos.repositories.IToppingRepository;
import com.maven.pos.services.IToppingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ToppingServiceImpl  implements IToppingService {
    @Autowired
    private IToppingRepository toppingRepository;

    @Override
    public Topping addTopping(Topping topping) {
        return toppingRepository.save(topping);
    }

    @Override
    public Topping getToppingById(Topping topping) {
        return toppingRepository.findById(topping.getToppingId()).get();
    }

    @Override
    public List<Topping> getAllToppings() {
        return toppingRepository.findAll();
    }

    @Override
    public Topping deleteToppingById(Long toppingId) {
        Optional<Topping> toppingOptional = toppingRepository.findById(toppingId);

        if (toppingOptional.isPresent()) {
            Topping topping = toppingOptional.get();
            toppingRepository.deleteById(toppingId);
            return topping;
        } else {
            throw new RuntimeException("Topping not found with id: " + toppingId);
        }
    }

    @Override
    public Topping updateTopping(Topping topping) {
        Topping oldTopping = toppingRepository.findById(topping.getToppingId()).get();

        oldTopping.setToppingName(topping.getToppingName());
        oldTopping.setToppingPrice(topping.getToppingPrice());
        return toppingRepository.save(oldTopping);
    }
}